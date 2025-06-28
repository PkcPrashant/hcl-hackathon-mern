import { Schema, model } from 'mongoose';

const UserDetailSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true },
  createdOn: { type: Date, default: Date.now },
  createdBy: { type: String },
  modifiedOn: { type: Date },
  modifiedBy: { type: String },
});

export default model('UserDetail', UserDetailSchema);