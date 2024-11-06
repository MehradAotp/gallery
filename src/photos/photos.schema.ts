import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from 'src/category/category.schema';
import { StatusEnum } from './dto/photo.dto';
import { User } from 'src/users/users.schema';
import mongooseAutopopulate from 'mongoose-autopopulate';

@Schema()
export class PhotoDocument extends Document {
  @Prop({ required: true })
  filename: string;
  @Prop({ required: true })
  title: string;
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Category.name }],
    required: true,
    autopopulate: true,
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
    autopopulate: true,
  })
  uploadedBy: User; //mongoose.Schema.Types.ObjectId to User
}

export const PhotoSchema = SchemaFactory.createForClass(PhotoDocument);
PhotoSchema.plugin(mongooseAutopopulate);
export interface PhotoPopulatedDocument
  extends Omit<PhotoDocument, 'uploadedBy' | 'categories'> {
  uploadedBy: User;
  categories: Category[];
}
