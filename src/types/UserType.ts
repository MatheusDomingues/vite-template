export type UserType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  phone: string;
  organizationId?: string;
  role?: string;
  invites?: number[];
};

export type CreateUserType = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};
