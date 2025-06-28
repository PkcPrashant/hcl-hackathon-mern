import { Schema, model } from 'mongoose';

const OrderDetailSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  modifiedOn: { type: Date },
  modifiedBy: { type: String },
  createdBy: { type: String, required: true },
  orderRefNo: { type: String, required: true },
  orderValue: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
  orderStatus: { type: String, required: true },
  idSecurityDetail: { type: String, required: true },
  transactionType: { type: String, required: true },
}, {
  collection: 'order_detail'
});

export default model('OrderDetail', OrderDetailSchema);
