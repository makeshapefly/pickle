import { Controller, Get, Inject, Injectable, Ip, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { MemberService } from '../provider/member.service';

//members controller
@Controller('member')
@Injectable({ scope: Scope.REQUEST })
export class MemberController {
  constructor(private readonly memberService: MemberService, @Inject(REQUEST) private readonly request: Request) {}
  @Get() 
  findAll() {
    console.log(this.request.headers)
    return this.memberService.getAllMembers();
  }
}

