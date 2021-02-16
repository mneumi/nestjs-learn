import { NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTaskById(
    id: number,
    user: User
  ): Promise<Task> {
    const found = await this.createQueryBuilder("task")
      .innerJoinAndSelect("task.user", "user", "user.id = :userId", { userId: user.id })
      .where("task.id = :id", { id })
      .getOne()

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    delete found.user;

    return found;
  }

  async getTasks(
    filterDto: GetTasksFilterDto,
    user: User
  ): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder("task")
      .where("task.userId = :userId", { userId: user.id });

    if (status) {
      query.andWhere("task.status = :status", { status });
    }

    if (search) {
      query.andWhere("(task.title LIKE :search OR task.description LIKE :search)", { search: `%${search}%` });
    }

    const tasks = await query.getMany();

    return tasks;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: User
  ): Promise<Task> {
    const { title, description } = createTaskDto;
    
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;

    await task.save();

    delete task.user;

    return task;
  }

  async updateTaskStatus(
    id: number, 
    status: TaskStatus,
    user: User
  ) {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    
    return task;
  }

  async removeTask(
    id: number,
    user: User
  ): Promise<number> {
    const result = await this.createQueryBuilder("task")
      .innerJoinAndSelect("task.user", "user", "user.id = :userId", { userId: user.id })
      .where("id = :id", { id })
      .delete()
      .execute();

    return result.affected;
  } 
}