import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum EmployeeStatus {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
}

@Schema()
export class Job {
  @Prop()
  name: string;

  @Prop()
  requirement: string;

  @Prop()
  description: string;

  @Prop()
  createdPost: Date;

  @Prop()
  deadlineApply: Date;

  @Prop()
  expiredPostAt: Date;

  @Prop()
  salaryShown: boolean;

  @Prop()
  jobCategory: string;

  @Prop()
  workingType: string;

  @Prop()
  employeeStatus: EmployeeStatus;

  // Lanjutkan dengan properti lainnya sesuai dengan struktur Anda
}

export type JobDocument = Job & Document;

export const JobSchema = SchemaFactory.createForClass(Job);
