import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PhotoDocument, PhotoSchema } from './photos.schema';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { Category, CategorySchema } from 'src/category/category.schema';
import { User, UserSchema } from 'src/users/users.schema';
import { CqrsModule } from '@nestjs/cqrs';
import { EventsService } from 'src/events/events.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([
      { name: PhotoDocument.name, schema: PhotoSchema },
    ]),
    NestjsFormDataModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'photo-exchange',
          type: 'topic',
        },
      ],
      uri: 'amqp://localhost:5672',
      connectionInitOptions: { wait: true },
      enableControllerDiscovery: true,
    }),
  ],
  controllers: [PhotosController],
  providers: [PhotosService, EventsService],
})
export class PhotosModule {}
