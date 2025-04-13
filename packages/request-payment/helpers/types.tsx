export type PayrollRequest = {
  id: string;
  userId: string;
  amount: number;
  currency: 'USD' | 'EUR' | 'TRY';
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  user?: User;
};

export type User = {
  id: string;
  name: string;
  email: string;
  department?: string;
  position?: string;
  image: string;
  role: 'MANAGER' | 'EMPLOYEE';
};
