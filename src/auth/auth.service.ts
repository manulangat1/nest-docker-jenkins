import { Injectable } from '@nestjs/common';
// import { User, Bookmark, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  login() {
    return 'Hi there!, you are trying to login in using post oops!';
  }
  logout() {}
  signup() {}
}
