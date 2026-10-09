export interface IUserRole {
  id: number;
  documentId: string;
  name: string;
  description: string;
  type: string;
}

export interface IUser {
  id: number;
  documentId: string;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  role: IUserRole;
}
