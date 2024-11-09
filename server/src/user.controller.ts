import { Body, Controller, Get, Post } from '@nestjs/common';
import { IUser } from './interfaces';
import { UserService } from './user.service';
import { SyncController } from './controllers/SyncController';

@Controller("/user")
export class UserController
{
  constructor(private readonly userService: UserService) { }

  @Get("/getUsers")
  getAll(): Promise<IUser[]>
  {
    return this.userService.getUsers();
  }

  @Post("/add")
  async add(@Body() user: IUser): Promise<boolean>
  {
    const result = await this.userService.addUser(user);
    await SyncController.syncToCloud();
    return result;
  }

  @Post("/getUser")
  getUser(@Body() getUserData: { name: string }): Promise<IUser | undefined>
  {
    return this.userService.getUser(getUserData.name);
  }

  @Post("/login")
  login(@Body() loginData: { name: string, password: string }): Promise<IUser | undefined>
  {
    return this.userService.login(loginData.name, loginData.password);
  }

  @Post("/getUserByToken")
  getUserByToken(@Body() getUserData: { token: string }): Promise<IUser | undefined>
  {
    return this.userService.getUserByToken(getUserData.token);
  }

  @Post("/update")
  async update(@Body() user: IUser): Promise<boolean>
  {
    const result = await this.userService.updateUser(user);
    await SyncController.syncToCloud();
    return result;
  }

  @Post("/delete")
  async delete(@Body() deleteData: { id: string }): Promise<boolean>
  {
    const result = await this.userService.deleteUser(deleteData.id);
    await SyncController.syncToCloud();
    return result;
  }
}
