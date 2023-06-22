import mongoose, { Schema, Document } from 'mongoose';

import { LocationEntity } from '../../../../domain/entities/Location';

const LocationSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    longitude: {
      type: String,
      required: true
    },
    latitude: {
      type: String,
      required: true,
      unique: true
    },
    address: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    opinions: {
      type: String,
      required: false
    },
    phone: {
      type: String,
      required: true
    },
    storeHours: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model<LocationEntity & Document>('Location', LocationSchema);
