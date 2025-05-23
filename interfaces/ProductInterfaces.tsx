export interface Product {
  product_id: number | string;
  name: string;
  description: string;
  details: string;
  brand: string;
  color: string;
  color_code: string;
  category: string;
  sub_category: string;
  product_type: string;
  price: number;
  qt_sold: number;
  is_recommended: boolean;
  is_new_product: boolean;
  bar_code: number;
  stock: number;
  ratting: number;
  ratting_qt: number;
  weight: number;
  height: number;
  width: number;
  length: number;
  images: {
    product_id: number;
    image_id: number;
    image_url: string;
    is_generic: boolean;
    color: string;
    color_code: string;
    bar_code: number;
  }[];
}

export interface ProductDetailsProps {
  product?: Product;
  productId?: string|string[]
}
