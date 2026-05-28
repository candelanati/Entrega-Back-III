import mongoose from 'mongoose';

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    specie: {
      type: String,
      required: true,
      trim: true
    },
    birthDate: Date,
    adopted: {
      type: Boolean,
      default: false
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Users'
    },
    image: String
  },
  { timestamps: true }
);

export const PetModel = mongoose.model('Pets', petSchema);
