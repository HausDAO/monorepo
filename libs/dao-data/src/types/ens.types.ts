export type ENSDomain = {
  id: string;
  registrationDate: string;
  expiryDate: string;
  domain?: {
    name?: string;
  };
} | undefined;
