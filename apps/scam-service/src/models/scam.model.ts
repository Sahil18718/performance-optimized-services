import mongoose, { Schema, Document } from 'mongoose';

export interface IScam extends Document {
  type: 'phone' | 'email';
  value: string;
  details: string;
  reportsCount: number;
}

const ScamSchema = new Schema<IScam>({
  type: { type: String, enum: ['phone', 'email'], required: true },
  value: { type: String, required: true, unique: true },
  details: { type: String, required: true },
  reportsCount: { type: Number, default: 1 },
});

export const Scam = mongoose.model<IScam>('Scam', ScamSchema);