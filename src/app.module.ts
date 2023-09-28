import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { RoomModule } from './modules/room/room.module';

@Module({
  imports: [
    AuthModule,
    RoomModule,
    // CorsModule.forRoot({
    //   origin: 'http://your-angular-app-domain.com', // แทนด้วยโดเมนของ Angular Frontend ของคุณ
    //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
