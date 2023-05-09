export interface ITasks {
  [id: string]: {
    Name: string;
    Label: string;
    ['Due date']: string;
    Type: string;
    Status: string;
    belongsTo: string;
  };
}
