import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { UserInput } from '../../models/user/user-input.model';
import { User } from '../../entities/user.entity';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() userInput: UserInput): Promise<User> {
        return this.userService.createUser(userInput);
    }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.findAllUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<User> {
        return await this.userService.findUserById(id);
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() userInput: UserInput): Promise<User> {
        return this.userService.updateUser(id, userInput);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<void> {
        await this.userService.deleteUser(id);
    }
}
