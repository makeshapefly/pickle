import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Member } from './entity/member.entity';
import { MemberModule } from './member.module';

@Module({
  imports: [
    MemberModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      //url: process.env.POSTGRES_URL,
      host: 'ep-late-rain-a2bj3tfd-pooler.eu-central-1.aws.neon.tech',
      port: 5432,
      database: 'neondb',
      username: 'neondb_owner',
      password: 'coEyiTwD9P2O',
      "ssl": true,
      entities: [Member],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Member])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
