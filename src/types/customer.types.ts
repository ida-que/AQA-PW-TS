import { COUNTRIES } from "../data/customers/countries.data";

export interface ICustomer {
    email: string;
    name: string;
    country: COUNTRIES;
    city: string;
    street: string;
    house: number;
    flat: number;
    phone: string;
    notes?: string;
}

export interface ICustomerFromResponse extends ICustomer {
  _id: string;
  createdOn: string;
}

export type TCustomerInTable = Pick<ICustomer, "email" | "name" | "country">;