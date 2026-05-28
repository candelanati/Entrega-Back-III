import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true
    },
    last_name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'user'
    },
    pets: {
      type: [
        {
          _id: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Pets'
          }
        }
      ],
      default: []
    }
  },
  { timestamps: true }
);

export const UserModel = mongoose.model('Users', userSchema);
