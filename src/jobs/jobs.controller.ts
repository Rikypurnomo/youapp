import { Controller, Get } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('api')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get('/jobs')
  findAll() {
    return this.jobsService.findAll();
  }
}
