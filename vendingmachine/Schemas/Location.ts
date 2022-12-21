import { model, models, Schema } from "mongoose";
import { ILocation } from "../Interface/Location";

const locationSchema = new Schema<ILocation>({
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
});

export const Location =
  models["Location"] || model<ILocation>("Location", locationSchema);
