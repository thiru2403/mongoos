import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProductDTO } from './dto/product.dto';
import { Product } from './interface/product.interface';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
 
   constructor(
    private productService:ProductService,
    @Inject('PRODUCT_SERVICE')  private client:ClientProxy   
    ){}
    @Get()
    async all():Promise<Product[]>{
        return await this.productService.all()
    }

    @Get(':id')
    async product(@Param('id') id:string):Promise<Product>{
        return await this.productService.product(id)
    }

    @Put(':id')
    async updateProduct(@Body() data:ProductDTO,@Param('id') id:string):Promise<Product>{
        await this.productService.updateproduct(id,data)
        const product = await this.productService.updateproduct(id,data)
        this.client.emit('product_Updated',product);
        return product
    }

    @Post()
    async create(@Body() data:ProductDTO):Promise<Product>{
     const product = await this.productService.create(data)
      this.client.emit('product_created',product);
        return product;
    }
    
    @Delete(':id')
    async deleteProduct(@Param('id')id:string):Promise<Product>{
        await this.productService.deleteproduct(id)
        const product = await this.productService.deleteproduct(id)
        this.client.emit('deleted_product',product)
        return product;
    }
}
