import mongoose, { ConnectOptions } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hcl';

declare global {
  var mongooseConn: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

global.mongooseConn ||= {
  conn: null,
  promise: null,
};

export async function connectDB(): Promise<typeof mongoose> {
  if (global.mongooseConn.conn) {
    return global.mongooseConn.conn;
  }

  if (!global.mongooseConn.promise) {
    global.mongooseConn.promise = mongoose.connect(MONGODB_URI, {
    } as ConnectOptions);
  }

  global.mongooseConn.conn = await global.mongooseConn.promise;
  return global.mongooseConn.conn;
}
