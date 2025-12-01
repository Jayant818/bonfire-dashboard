import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BonfireModule } from './bonfire/bonfire.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'client', 'dist'),
      exclude: ['/api(.*)'],
    }),
    BonfireModule,
  ],
})
export class AppModule {}