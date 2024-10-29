import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { IPassword } from './interfaces';

@Controller()
export class AppController
{
  constructor(private readonly appService: AppService) { }

  @Get("/getAll")
  getAll(): Promise<IPassword[]>
  {
    return this.appService.getAll();
  }

  @Post("/add")
  add(@Body() password: IPassword): Promise<boolean>
  {
    return this.appService.add(password);
  }

  @Post("/update")
  update(@Body() password: IPassword): Promise<boolean>
  {
    return this.appService.update(password);
  }

  @Post("/delete")
  delete(@Body() id: string): Promise<boolean>
  {
    return this.appService.delete(id);
  }
}
