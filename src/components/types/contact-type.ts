export interface IContactData {
  Name: string;
  Email: string;
  ['Company name']: string;
  Role: string;
  Forecast: string;
  ['Due date']: string;
  belongsContactTo: string;
  isDone: boolean;
  uid: string;
}

export interface IContact {
  [id: string]: IContactData;
}
