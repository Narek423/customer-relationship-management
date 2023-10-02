export interface ITaskData {
  ['Full name']: string;
  Label: string;
  ['Due date']: string;
  Type: string;
  Status: string;
  belongsTo: string;
  uid: string;
  avatar: string;
}
export interface ITasks {
  [id: string]: ITaskData;
}

// Due date
// :
// "2023-05-17"
// Full name
// :
// "zdfzv"
// Label
// :
// "asvd"
// Status
// :
// "Ended"
// Type
// :
// "jhv"
// avatar
// :
// "./assets/avatar.jpg"
// belongsTo
// :
// "qE8PKc1EppUZa229
