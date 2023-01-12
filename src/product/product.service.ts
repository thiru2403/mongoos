import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interface/product.interface';
import { Model} from 'mongoose'
import { ProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private ProductModel: Model<Product>){}

  async all():Promise<Product[]>{
    return await this.ProductModel.find().exec()
  }
  async product(@Param('id') id:string):Promise<Product>{
    return await this.ProductModel.findById(id).exec()
  }
  async updateproduct(id:string,data:ProductDTO):Promise<Product>{
    return await this.ProductModel.findOneAndUpdate({_id:id},data,{new:true}).exec()
  }

 async deleteproduct(id:string):Promise<Product>{
    return await this.ProductModel.findOneAndDelete({_id:id}).exec()
 }

    async create(data:ProductDTO):Promise<Product>{
     const Product= new this.ProductModel(data);
     return await Product.save();
    }
}



