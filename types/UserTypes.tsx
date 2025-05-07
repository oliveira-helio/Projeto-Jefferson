export type UserType = {
  id: number | null,
  name: string | null,
  surname?: string | null,
  gender?: string | null,
  profilePicture?: string | null,
  email: string | null,
  birthDate?: Date | null,
  phone?: string | null,
  cpf?: string | null,
  isAdmin?: boolean,
  provider?: string | null,
};

export type UserAddressType = {
  addressId?: number;
  isMainAddress?: boolean;
  cep : string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
};

