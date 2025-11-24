import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BonsaiModule } from './bonsai/bonsai.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'client', 'dist'),
      exclude: ['/api(.*)'],
    }),
    BonsaiModule,
  ],
})
export class AppModule {}