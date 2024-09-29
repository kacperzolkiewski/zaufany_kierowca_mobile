import { Location } from "@/features/ride/utilities/AddRideReducer";

interface IModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends IModel {
  name: string;
  email: string;
  role: string;
  rides: IRide[];
  reservations: IReservation[];
  opinionsGiven: IOpinion[];
  opinionsReceived: IOpinion[];
  verified: boolean;
  firstLoginToApplication: boolean;
  kilometersTraveled: number;
  phone?: string;
  imageUrl?: string;
  car?: string;
  birthDate?: string;
  description?: string;
}

export interface IOpinion extends IModel {
  stars: number;
  comment: string;
  receiver: IUser;
  giver: IUser;
}

export interface IRide extends IModel {
  originAddress: IAddress;
  destinationAddress: IAddress;
  startTime: string;
  endTime: string;
  price: number;
  preferences: string[];
  user: IUser;
  reservations: IReservation[];
  availableSeats: number;
}

export interface IReservation extends IModel {
  ride: IRide;
  user: IUser;
  approved: boolean | null;
}

export interface IGenericResponse {
  status: string;
  message: string;
}

export interface IAddress extends IModel {
  name: string;
  latitude: string;
  longitude: string;
  originRides: IRide[];
  destinationRides: IRide[];
}

export interface RidesInput {
  originAddress: Location;
  destinationAddress: Location;
  startTime: string;
  endTime: string;
  price: number;
  preferences: string[];
  availableSeats: number;
  distanceInKm: number;
}
