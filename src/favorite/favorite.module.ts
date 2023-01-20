import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductModule } from "src/product/product.module";
import { FavoriteController } from "./controllers/favorite.controller";
import { Favorite } from "./models/favorite.model";
import { FavoriteService } from "./services/favorite.service";

@Module({
  imports: [TypeOrmModule.forFeature([Favorite]), ProductModule],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule { }

