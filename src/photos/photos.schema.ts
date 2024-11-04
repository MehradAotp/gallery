import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from 'src/category/category.schema';
import { User } from 'src/users/users.schema';
import { StatusEnum } from './dto/photoDto';

@Schema()
export class Photo extends Document {
  @Prop({ required: true })
  filename: string;
  @Prop({ required: true })
  title: string;
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Category.name }],
    required: true,
  })
  categories: Category[];
  @Prop({ required: false })
  description?: string;
  @Prop({
    required: true,
    enum: StatusEnum,
    default: StatusEnum.PENDING,
  })
  status: StatusEnum;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  uploadedBy: mongoose.Schema.Types.ObjectId;
}
export const PhotoSchema = SchemaFactory.createForClass(Photo);
