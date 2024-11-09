import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { IPassword } from './interfaces';

@Controller()
export class AppController
{
  constructor(private readonly appService: AppService) { }

  @Post("/getAll")
  getAll(@Body() getAllData: { userId: string }): Promise<IPassword[]>
  {
    return this.appService.getAll(getAllData.userId);
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

  @Post("/updateList")
  updateList(@Body() passwordList: IPassword[]): Promise<boolean>
  {
    return this.appService.updateList(passwordList);
  }

  @Post("/delete")
  delete(@Body() deleteData: { id: string }): Promise<boolean>
  {
    return this.appService.delete(deleteData.id);
  }
}
