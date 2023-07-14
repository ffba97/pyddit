import {IsNotEmpty, IsEmail, IsString} from "class-validator"
export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    readonly email:string

    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;
}
