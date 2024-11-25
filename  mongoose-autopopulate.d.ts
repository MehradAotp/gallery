declare module 'mongoose-autopopulate' {
  import { Schema } from 'mongoose';

  function mongooseAutopopulate(schema: Schema): void;
  export = mongooseAutopopulate;
}
