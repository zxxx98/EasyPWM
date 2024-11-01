import { Body, Controller, Get, Post } from '@nestjs/common';
import { IUser } from './interfaces';
import { UserService } from './user.service';

@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get("/getUsers")
  getAll(): Promise<IUser[]> {
    return this.userService.getUsers();
  }

  @Post("/add")
  add(@Body() user: IUser): Promise<boolean> {
    return this.userService.addUser(user);
  }

  getUser(@Body() getUserData: { name: string }): Promise<IUser | undefined> {
    return this.userService.getUser(getUserData.name);
  }

  getUserByToken(@Body() getUserData: { token: string }): Promise<IUser | undefined> {
    return this.userService.getUserByToken(getUserData.token);
  }

  @Post("/update")
  update(@Body() user: IUser): Promise<boolean> {
    return this.userService.updateUser(user);
  }

  @Post("/delete")
  delete(@Body() deleteData: { id: string }): Promise<boolean> {
    return this.userService.deleteUser(deleteData.id);
  }
}
