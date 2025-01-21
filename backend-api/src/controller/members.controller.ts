import { Controller, Get } from '@nestjs/common';
import { MemberService } from '../provider/member.service';
import { Member } from 'src/entity/member.entity';

@Controller('members')
export class MembersController {
  constructor(private readonly memberService: MemberService) {}
  @Get()
  findAll() {
    return this.memberService.getAllMembers();
  }
}