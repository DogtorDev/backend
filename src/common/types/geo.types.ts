import * as mongoose from 'mongoose';

export const GeoSchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'Point',
  },
  coordinates: {
    type: [Number], //the type is an array of numbers
    default: null,
  },
});
