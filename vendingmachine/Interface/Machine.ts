import { ILocation } from "./Location";

export interface IMachine {
  location: ILocation;
  slots: ISlot[];
  id: number;
}

export interface ISlot {
  index: number;
  candy: ICandy;
  stock: number;
}

export interface ICandy {
  name: string;
  description: string;
  price: number;
  image: string;
}
