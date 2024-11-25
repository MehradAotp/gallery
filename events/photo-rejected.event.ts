import { Types } from 'mongoose';

export class PhotoRejectedEvent {
  constructor(
    public readonly photoId: string,
    public readonly userId: Types.ObjectId,
  ) {}
}
