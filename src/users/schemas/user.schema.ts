// src/users/schemas/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types }             from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, enum: ['admin', 'organizer', 'staff', 'client'] })
  role: string;

  @Prop({ type: Types.ObjectId, ref: 'Entity' })
  entityId: Types.ObjectId;

  @Prop({ required: true, maxlength: 100, trim: true })
  name: string;

  @Prop({
    required: true,
    unique: true,         // esto ya crea el índice único en email
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
  })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ maxlength: 20, match: /^\+?[0-9\s-]{7,20}$/ })
  phone: string;

  @Prop({ maxlength: 200, trim: true })
  address: string;

  @Prop({ enum: ['pending', 'active', 'rejected'] })
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Sólo mantenemos los índices que NO proceden de un unique en @Prop:
UserSchema.index({ role: 1 });
UserSchema.index({ entityId: 1 });
