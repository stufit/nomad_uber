import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      // isGlobal : 어플리케이션의 어디서나 config 모듈에 접근 할 수 있음.
      isGlobal: true,
      // envFilePath : 실행환경을 설정하는 것으로, 개발서버, stage서버, main 서버 등 나뉠 때 경로 설정
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      // ignoreEnvFile : 서버에 deploy할 때 , 환경변수 파일을 사용하지 않음.
      // process.env.NODE_ENV 값이 PROD 일 때에만 true도록 설정 -> prod 환경일 때에는 환경변수 파일을 무시
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      // required 로 표시된 것이 없으면 validation 에러 뜸.
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT, // string형식은 + 를 붙여줌으로써 number로 변환됨.
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      //entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    RestaurantsModule,
  ],
})
export class AppModule {}
