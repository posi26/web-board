import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserInput } from '../models/user/user-input.model';
import { randomUUID } from 'crypto';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async createUser(userInput: UserInput): Promise<User> {
        const existingUser = await this.userRepository.findOne({ where: { username: userInput.username } });
        if (existingUser) {
            throw new Error('Username already exists');
        }

        const id = randomUUID();
        const createDate = new Date();
        const newUser: User = {
            id,
            createDate,
            username: userInput.username,
            email: userInput.email,
            password: userInput.password,
            name: userInput.name
        };
        return this.userRepository.save(newUser);
    }


    async findAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findUserById(id: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async updateUser(id: string, userInput: UserInput): Promise<User> {
        const user = await this.findUserById(id);
        Object.assign(user, userInput);
        return this.userRepository.save(user);
    }

    async deleteUser(id: string): Promise<void> {
        await this.findUserById(id);
        await this.userRepository.delete(id);
    }

    async findByUsername(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { username } });
    }
}
