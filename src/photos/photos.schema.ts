import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Photo extends Document {
  @Prop({ required: true })
  filename: string;
  @Prop({ required: true })
  title: string;
  @Prop({ type: [Types.ObjectId], ref: 'Category', required: true })
  categories: Types.ObjectId[];
  @Prop({ required: false })
  description?: string;
  @Prop({
    required: true,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  })
  status: string;
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  uploadedBy: Types.ObjectId;
}
export const PhotoSchema = SchemaFactory.createForClass(Photo);
