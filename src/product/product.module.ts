import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule} from '@nestjs/mongoose'
import { ProductSchema } from './product.entity/product.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ClientsModule.register([
    {
      name: 'PRODUCT_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://zihimttj:PrRGClY8ShBfS7kFxEO5Elq2cMz8DKlr@rabbit.lmq.cloudamqp.com/zihimttj'],
        queue: 'main_queue',
        queueOptions: {
          durable: false
        },
      },
    },
  ]),
],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
