import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../entity/member.entity'

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  /*async createPoll(question: string, options: string[]): Promise<Poll> {
    const poll = this.pollRepository.create({ question, options });
    return this.pollRepository.save(poll);
  }*/

  async getAllMembers(): Promise<Member[]> {
    return this.memberRepository.find();
  }
}