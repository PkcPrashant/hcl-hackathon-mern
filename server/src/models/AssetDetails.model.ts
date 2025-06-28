import { Schema, model } from 'mongoose';

const AssetDetailSchema = new Schema({
  idUserLoginDetail: { type: String, required: true },
  assetName: { type: String, required: true },
  assetType: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
}, {
  collection: 'asset_detail'
});

export default model('AssetDetail', AssetDetailSchema);
