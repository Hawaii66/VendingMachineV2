import { model, models, Schema } from "mongoose";
import { ICandy, IMachine, ISlot } from "../Interface/Machine";

const candySchema = new Schema<ICandy>({
  description: { type: String, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0, max: 50 },
});

const slotSchema = new Schema<ISlot>({
  candy: candySchema,
  index: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true },
});

const machineSchema = new Schema<IMachine>({
  location: { type: String, required: true },
  slots: [slotSchema],
  id: { type: Number, required: true, min: 0 },
});

export const Machine =
  models["Machine"] || model<IMachine>("Machine", machineSchema);
