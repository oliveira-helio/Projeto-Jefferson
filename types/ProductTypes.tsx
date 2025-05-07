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

export type SelectedColorType = {
  productId: number;
  imageUrl: string;
  color: string;
  colorCode: string;
  barCode: number;
};