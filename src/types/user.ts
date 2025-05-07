
export interface User {
  id: string;
  name?: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  role: string; // Changed from optional to required to fix type errors
  createdAt: Date;
  updatedAt: Date;
}
