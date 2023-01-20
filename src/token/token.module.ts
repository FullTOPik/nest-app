import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Token } from "./models/token.model";
import { TokenService } from "./services/token.servise";

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  providers: [TokenService],
  exports: [TypeOrmModule, TokenService],
})
export class TokenModule {}