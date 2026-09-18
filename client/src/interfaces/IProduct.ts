export interface IProduct {
  id: number;
  documentId:string;
  title: string;
  description: string;
  price: number;
  stock: number;
  thumbnail: {
    url: string;
  };
}