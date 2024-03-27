import { IsEmail } from "class-validator";

export class UserInput {
    username: string;
    @IsEmail()
    email: string;
    password: string;
    name: string;
}
