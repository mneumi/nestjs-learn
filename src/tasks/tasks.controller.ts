import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@ApiTags("Task")
@Controller('tasks')
@UseGuards(AuthGuard("jwt"))
export class TasksController {
  constructor(private taskService: TasksService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: "根据条件获取多个或全部Task" })
  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User
  ): Promise<Task[]> {
    console.log("111")
    return this.taskService.getTasks(filterDto, user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "创建Task" })
  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "根据id获取特定Task" })
  @ApiParam({
    name: 'id',
    description: 'task的id',
  })
  @Get("/:id")
  getTaskById(
    @Param("id", ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "根据id更新Task的状态" })
  @Patch("/:id/status")
  updateTaskStatus(
    @Param("id", ParseIntPipe) id: number, 
    @Body("status", TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, status, user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "根据id删除特定Task" })
  @Delete("/:id")
  removeTaskById(
    @Param("id", ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<void> {
    return this.taskService.removeTask(id, user);
  }
}
