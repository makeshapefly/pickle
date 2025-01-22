import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberController } from './controller/member.controller';
import { Member } from './entity/member.entity';
import { MemberService } from './provider/member.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Member]),
    ],
    controllers: [MemberController],
    providers: [MemberService],
    exports: [MemberService]
})
export class MemberModule { }