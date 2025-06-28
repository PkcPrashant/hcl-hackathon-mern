import { Schema, model } from 'mongoose';

const AuditUserLoginSchema = new Schema({
  logoutDateTime: { type: Date },
  sessionId: { type: String, required: true },
  loginStatus: { type: String, required: true },
  loginDateTime: { type: Date, default: Date.now },
  idUserLoginDetail: { type: String, required: true },
}, {
  collection: 'audit_user_login'
});

export default model('AuditUserLogin', AuditUserLoginSchema);
