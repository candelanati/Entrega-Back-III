import mongoose from 'mongoose';

const adoptionSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Users',
      required: true
    },
    pet: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Pets',
      required: true
    }
  },
  { timestamps: true }
);

export const AdoptionModel = mongoose.model('Adoptions', adoptionSchema);
