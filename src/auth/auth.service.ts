import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) { }

    async logIn(username: string, pass: string): Promise<any> {
        try {
            const user : User = await this.userService.findByName(username);
            if (!user) return new NotFoundException(`No existe un usuario el nombre ${username}`);
            
            const isOkay : boolean = this.passwordMatch(pass, user.password);

            return isOkay ? user : new BadRequestException("Contraseña incorrecta");

        } catch (error) {
            return new NotFoundException(`No se ha podido iniciar sesion`)
        }

    }

    async signUp(newUser: CreateUserDto) {
        try {
            return this.userService.create(newUser);
        } catch (error) {
            return new InternalServerErrorException("Ocurrio un error, intentalo mas tarde")
        }
    }

    passwordMatch(password: string, passwordEncrypted: string) : boolean {
        try {
            const result: boolean = bcrypt.compareSync(password, passwordEncrypted);
            return result;
        } catch (error) {
            return false;
        }
    }

}
