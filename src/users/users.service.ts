import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as uuid from 'uuid';

@Injectable()
export class UsersService {
  async createUser(dto: CreateUserDto) {
    const { name, email, password } = dto;

    await this.checkUserExists(email);

    const signupVerifyToken = uuid.v1();

    await this.saveUser(name, email, password, signupVerifyToken);
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }
  private async checkUserExists(email: string): Promise<boolean> {
    return false;
  }

  private async saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    return;
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this._emailSvc.sendMemberJoinVerification(email, signupVerifyToken);
  }
}
