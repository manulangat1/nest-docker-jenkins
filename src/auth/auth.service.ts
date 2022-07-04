import { ForbiddenException, Injectable } from '@nestjs/common';
// import { User, Bookmark, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async login(dto: AuthDto) {
    try {
      // find user by email
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          email: dto.email,
        },
      });
      // if user does not exist  throw exception with guard condition
      if (!user) {
        throw new ForbiddenException('Credentials incorrect');
      }
      // compare password
      const pwMatches = await argon.verify((await user).password, dto.password);
      // if password incorrect throw exception
      if (!pwMatches) {
        throw new ForbiddenException('Credentials incorrect');
      }
      // generate jwt token
      const token = await this.signToken((await user).id, (await user).email);
      // change this to class transformer
      delete (await user).password;
      // return logged in user
      const data = {
        user,
        access_token: token,
      };
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
    // return 'Hi there!, you are trying to login in using post oops!';
  }
  logout() {}
  async signup(dto: AuthDto): Promise<User> {
    // generate password
    const hash = await argon.hash(dto.password);
    // save user to db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
        },
        // select: {
        //   id: true,
        //   email: true,
        //   createdAt: true,
        //   firstName: true,
        //   lastName: true,
        // },
      });
      delete user.password;
      // return user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
        throw error;
      }
      throw error;
    }
  }
  async signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };
    return this.jwt.signAsync(payload, {
      expiresIn: '2h',
      secret: this.config.get('JWT_SECRET'),
    });
  }
}
