import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BonfireModule } from './bonfire/bonfire.module';

const imports: any = [BonfireModule];
if (process.env.NODE_ENV !== 'production') {
  imports.unshift(ServeStaticModule.forRoot({
    rootPath: join(process.cwd(), 'client', 'dist'),
    exclude: ['/api(.*)'],
  }))
}

@Module({ imports })

export class AppModule { }
