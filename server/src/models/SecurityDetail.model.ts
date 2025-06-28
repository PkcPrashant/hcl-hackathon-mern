import { Schema, model } from 'mongoose';

const SecurityDetailSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  securityName: { type: String },
  value: { type: Number, required: true },
}, {
  collection: 'security_detail'
});

export default model('SecurityDetail', SecurityDetailSchema);
