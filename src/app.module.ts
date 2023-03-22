import { Module } from '@nestjs/common';
import { CardReaderModule } from './card-reader/card.reader.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { GroupsModule } from './groups/groups.module';
import { LessonsModule } from './lessons/lessons.module';
import { UsersModule } from './users/users.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    /*TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db.ysxtwtmydmswmqvvbppc.supabase.co',
      port: 5432,
      username: 'postgres',
      password: 'HTMLcardreaderETOBASA1041333!!',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),*/
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'HTMLcardreaderETOBASA1041333!!',
      database: 'startuem',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    CardReaderModule,
    RolesModule,
    CoursesModule,
    GroupsModule,
    LessonsModule,
    UsersModule,
    SubjectsModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
