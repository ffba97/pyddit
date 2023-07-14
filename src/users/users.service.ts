import {SALT_ROUND} from "../config"
import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, Response } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from "typeorm"
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
  }

  /**
   * Create a new user
   * @param user
   * @returns 
   */
  async create(user: CreateUserDto) {
    try {
      const { password} = user;
      const passwordHash = await this.hashPassword(password);
      if(!passwordHash) return InternalServerErrorException;
      const newUser = this.userRepository.create({ ...user, password: passwordHash });
      return this.userRepository.save(newUser);
    } catch (error) {
      return new HttpException({
        status: HttpStatus.BAD_REQUEST, error: error
      },
        HttpStatus.BAD_REQUEST, { cause: error }
      )
    }
  }

  /**
   * Receive a password or string and after return's it encrypted
   * @param password 
   * @returns 
   */
  private async hashPassword(password: string) {
    try {
      const hash = bcrypt.hashSync(password, SALT_ROUND);
      return hash;
    } catch (error) {
      console.log(error);
      return error
    }
  }

  findAll() {
    try {
      return this.userRepository.find();
    } catch (error) {
      return new NotFoundException(`No se encontraron usuarios`)
    }
  }

  findOne(id: number) {
    try {
      const user = this.userRepository.findOne({ where: { id } });
      if (!user) return new HttpException("No existe un usuario con este ID", HttpStatus.NOT_FOUND)
      return user;
    } catch (error) {
      return new NotFoundException(`No se encontró el usuario ${id}`)
    }
  }

  findByName(username: string): Promise<User> {
      return this.userRepository.findOne({ where: { username: username } })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
