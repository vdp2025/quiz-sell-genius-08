
export interface User {
  id: string;
  name?: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  role: string; // This is already defined as required
  createdAt: Date;
  updatedAt: Date;
}
