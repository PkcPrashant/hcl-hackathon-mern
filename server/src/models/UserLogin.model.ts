import { Schema, model } from 'mongoose';

const UserLoginDetailSchema = new Schema({
  idUserDetail: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true },
  userStatus: { type: String, default: 'active' },
  createdOn: { type: Date, default: Date.now },
  createdBy: { type: String },
  modifiedOn: { type: Date },
  modifiedBy: { type: String },
}, { collection: 'user_login_detail' });

export default model('user', UserLoginDetailSchema);
