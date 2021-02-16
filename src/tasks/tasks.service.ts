import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  async getTasks(
    filterDto: GetTasksFilterDto,
    user: User
  ): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(
    id: number,
    user: User
  ): Promise<Task> {
    return this.taskRepository.getTaskById(id, user);
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: User
  ): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async updateTaskStatus(
    id: number, 
    status: TaskStatus,
    user: User
  ): Promise<Task> {
    return this.taskRepository.updateTaskStatus(id ,status, user);
  }

  async removeTask(
    id: number,
    user: User
  ): Promise<void> {
    const affect = await this.taskRepository.removeTask(id ,user);
    if (!affect) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
