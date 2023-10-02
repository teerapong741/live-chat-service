import { Module } from "@nestjs/common";
import { RoomModule } from "../room/room.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [RoomModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {} 