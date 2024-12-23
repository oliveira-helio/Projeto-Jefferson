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
  deliveryFee: number;
  deliveryCep: string;
  deliveryType: string;
  deliveryTime: string;
};

export type DeliveryInfoType = {
  cep: string;
  fee: number;
  type: string;
  time: string;
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
