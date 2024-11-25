import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { PhotoApprovedEvent } from 'events/photo-approved.event';
import { Model } from 'mongoose';
import { EmailService } from 'src/email/email.service';
import { User } from 'src/users/users.schema';

@EventsHandler(PhotoApprovedEvent)
export class PhotoApprovedHandler implements IEventHandler<PhotoApprovedEvent> {
  constructor(
    private readonly emailService: EmailService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async handle(event: PhotoApprovedEvent) {
    try {
      const user = await this.userModel.findById(event.userId).lean();
      if (user) {
        await this.emailService.sendEmail(
          user.email,
          'عکس شما تایید شد.',
          `سلام ${user.username}، وضعیت عکس شما به تایید شد تغییر کرده است.`,
        );
        console.log(`Email notification sent to ${user.email}.`);
      } else {
        console.error(`User with ID ${event.userId} not found.`);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}
