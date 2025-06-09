import { COUNTRIES } from "../data/customers/countries.data";
import { ORDER_STATUSES, DELIVERY_CONDITIONS, ORDER_HISTORY_ACTIONS } from "../data/orders";
import { ICustomerFromResponse } from "./customer.types";
import { IProductInOrder } from "./product.types";
import { IUser } from "./signIn.types";

export interface IOrder {
  _id: string;
  status: ORDER_STATUSES;
  customer: ICustomerFromResponse;
  products: IProductInOrder[];
  delivery: IDelivery | null;
  total_price: number;
  createdOn: string;
  comments?: IOrderComment[];
  history?: IOrderHistoryItem[];
  assignedManager: IUser;
}

export interface IDelivery {
  finalDate: string;
  condition: DELIVERY_CONDITIONS;
  address: IAddress;
}

export interface IAddress {
  country: COUNTRIES;
  city: string;
  street: string;
  house: number;
  flat: number;
}

export interface IOrderComment {
  _id: string;
  text: string;
  createdOn: string;
}

export interface IOrderHistoryItem {
  status: ORDER_STATUSES;
  customer: string;
  products: IProductInOrder[];
  total_price: number;
  delivery: IDelivery | null;
  changedOn: string;
  action: ORDER_HISTORY_ACTIONS;
  performer: IUser;
}