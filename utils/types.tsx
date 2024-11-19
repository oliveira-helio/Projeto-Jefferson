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
};
