
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

// Define another type alias pointing to the same interface to ensure correct type recognition
export type UserWithRole = User;
