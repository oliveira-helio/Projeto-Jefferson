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