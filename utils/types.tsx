export type SelectedColorType = {
  productId: number;
  imageUrl: string;
  color: string;
  colorCode: string;
  barCode: number;
};

export type CartProductType = {
  productId: number;
  name: string;
  brand: string;
  color: string;
  colorCode: string;
  subCategory: string;
  productType: string;
  price: number;
  barCode: number;
  image: string;
  quantity: number;
  deliveryFee?: number | null;
  deliveryCep?: string | null | undefined;
  deliveryType?: string | null;
  deliveryTime?: string | null;
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

export type DeliveryInfoType = {
  id?: number,
  error?: string,
  name?: string,
  price?: string,
  custom_price?: string,
  discount?: string,
  currency?: string,
  delivery_time?: number,
  delivery_range?: { min?: number, max?: number },
  custom_delivery_time?: number,
  custom_delivery_range?: { min?: number, max?: Number },
  packages: {
    dimensions?: {height?: number, width?: number, length?: number}
    discount?: string
    format?: string
    insurance_value?: string
    price?: string
    weight?: string
  }[],
  additional_services?: { receipt?: boolean, own_hand?: boolean, collect?: boolean },
  company: {
    id?: number,
    name?: string,
    picture: string
  }
};

export type DeliveryAdressType = {
  cep: string;
  street: string;
  number: boolean | string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
};

export type User = {
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