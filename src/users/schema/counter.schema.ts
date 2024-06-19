import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CounterDocument = Counter & Document;

@Schema({ timestamps: true, strict: false })
export class Counter {
  @Prop({
    type: MongooseSchema.Types.String,
    unique: true,
    required: true,
    index: true,
  })
  id: string;

  @Prop({
    type: MongooseSchema.Types.Number,
    default: 0,
  })
  sequence: number;
}

export const CounterSchema = SchemaFactory.createForClass(Counter);
