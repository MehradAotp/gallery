import { Types } from 'mongoose';

export class PhotoApprovedEvent {
  constructor(
    public readonly photoId: string,
    public readonly userId: Types.ObjectId,
  ) {}
}
