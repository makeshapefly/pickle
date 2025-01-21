import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { MembersController } from './controller/members.controller';
import { AppService } from './app.service';
import { Member } from './entity/member.entity';
import { MemberService } from './provider/member.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      //url: process.env.POSTGRES_URL,
      host: 'ep-late-rain-a2bj3tfd-pooler.eu-central-1.aws.neon.tech',
      port: 5432,
      username: 'neondb_owner',
      password: 'coEyiTwD9P2O',
      "ssl": true,
      entities: [Member],
      synchronize: true,
    }),
  ],
  controllers: [AppController, MembersController],
  providers: [AppService],
})
export class AppModule {}
