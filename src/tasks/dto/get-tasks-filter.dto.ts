import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDto {
  @ApiProperty({ title: "Task状态", description: "Task状态的描述", enum: [TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE], required: false })
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status?: TaskStatus;

  @ApiPropertyOptional()
  @ApiProperty({ title: "search信息", description: "search信息的描述" })
  @IsOptional()
  @IsNotEmpty()
  search?: string;
}