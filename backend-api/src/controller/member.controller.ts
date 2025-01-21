import { Controller, Get } from '@nestjs/common';
import { MemberService } from '../provider/member.service';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}
  @Get()
  findAll() {
    return this.memberService.getAllMembers();
  }
}