import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from "class-validator";

export class CreateTaskDto {
  @ApiProperty({ title: "Task名称", description: "Task名称的描述" })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ title: "Task描述", description: "Task描述的描述" })
  @IsNotEmpty()
  description: string;
}
