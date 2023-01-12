import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule} from '@nestjs/mongoose'
@Module({
  imports: [ProductModule,MongooseModule.forRoot('mongodb+srv://Thiruselvam:F6PDm2qNdP1urYa1@cluster0.4xuwuro.mongodb.net/?retryWrites=true&w=majority',{autoCreate:true})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

