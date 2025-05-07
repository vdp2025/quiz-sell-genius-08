
export interface User {
  id: string;
  name?: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  role?: string; // Adding role property to fix errors
  createdAt: Date;
  updatedAt: Date;
}
