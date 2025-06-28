import { Schema, model } from 'mongoose';

const PortfolioDetailSchema = new Schema({
  createdOn: { type: Date, default: Date.now },
  portfolioName: { type: String, required: true },
  portfolioType: { type: String, required: true },
}, {
  collection: 'portfolio_detail'
});

export default model('PortfolioDetail', PortfolioDetailSchema);
