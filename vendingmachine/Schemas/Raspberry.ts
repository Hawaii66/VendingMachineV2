import { Schema, models, model } from "mongoose";

const raspberrySchema = new Schema<any>({
  machine: { type: Number, required: true },
  candy: { type: Number, required: true },
});

export const Raspberry =
  models["Raspberry"] || model<any>("Raspberry", raspberrySchema);
