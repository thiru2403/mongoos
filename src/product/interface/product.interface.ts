import {Document} from 'mongoose'

export interface Product extends Document{
    
    id:number;
    title: string;
    image: string;
    likes: number;
}