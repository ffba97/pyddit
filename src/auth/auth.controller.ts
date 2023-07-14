import { Body, Controller, HttpCode, Post, ValidationPipe } from '@nestjs/common';
import { IsNotEmpty } from "class-validator"
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';


class Credentials {
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    password: string;
}
@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }
    
    @Post('login')
    @HttpCode(200)
    logIn(@Body(new ValidationPipe()) credentials: Credentials) {
        const {username,password} = credentials;
        return this.authService.logIn(username,password);
    }

    @Post('signup')
    signUp(@Body(new ValidationPipe()) newUser: CreateUserDto){
        return this.authService.signUp(newUser);
    }
    
}
