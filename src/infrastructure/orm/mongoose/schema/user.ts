import mongoose, { Schema, Document } from 'mongoose';

import { UserEntity } from '../../../../domain/entities/User';

const UserSchema: Schema = new Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    gender: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model<UserEntity & Document>('User', UserSchema);
