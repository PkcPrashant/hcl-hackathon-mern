import { Schema, model } from 'mongoose';

const AuditActionSchema = new Schema({
  endDateTime: { type: Date },
  userAction: { type: String, required: true },
  startDateTime: { type: Date, default: Date.now },
  idUserLoginDetail: { type: String, required: true },
}, {
  collection: 'audit_action'
});

export default model('AuditAction', AuditActionSchema);
