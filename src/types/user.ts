
export interface User {
  id: string;
  name?: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  role?: string;
  createdAt: Date;
  updatedAt: Date;
}
