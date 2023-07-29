export interface ITaskData {
  Name: string;
  Label: string;
  ['Due date']: string;
  Type: string;
  Status: string;
  belongsTo: string;
}
export interface ITasks {
  [id: string]: ITaskData;
}
