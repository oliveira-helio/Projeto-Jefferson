import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import axios, { AxiosInstance } from "axios";
import {  CartProductType, DeliveryInfoType, UserAddressType } from "@/utils/types";
import toast from "react-hot-toast";
import apiAdress from "@/utils/api";
import { useAuth } from "@/Contexts/AuthContext";
import { useCart } from "./useCart";

interface AddressContextType {
  userAddresses:  UserAddressType[];
  selectedAddress:  UserAddressType | null;
  selectedDelivery: DeliveryInfoType | null;
  deliveryOptions: DeliveryInfoType[] | null;
  fetchDeliveryOptions: (productList: CartProductType[], deliveryCep: string) => Promise<DeliveryInfoType[]>;
  fetchUserAddresses: () => void;
  handleSelectAddress: (address: UserAddressType) => void;
  handleSelectDeliveryType: (deliveryData: DeliveryInfoType) => void;
  handleAddAddress: (address: UserAddressType) => void;
  handleRemoveAddress: (address: UserAddressType) => void;
  handleUpdateAddress: (address: UserAddressType) => void;
}

interface AddressContextProviderProps {
  children: ReactNode;
}

const API_URL = `${apiAdress}/user/address`;
const AddressContext = createContext<AddressContextType | null>(null);

export const AddressContextProvider: React.FC<AddressContextProviderProps> = ({
  children,
}) => {
  const [selectedAddress, setSelectedAddress] = useState<UserAddressType | null>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryInfoType | null>(null);
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryInfoType[] | null>(null);
  const [userAddresses, setUserAddresses] = useState<UserAddressType[]>([]);
  const { accessToken } = useAuth()
  const [axiosInstance, setAxiosInstance] = useState<AxiosInstance | null>(null);  
  const { selectedProducts } = useCart();

  // Fetch the user addresses
  const fetchUserAddresses = useCallback(async () => {
    if (!axiosInstance) return;

    try {
      const response = await axiosInstance.get("/");      
      const userAddresses: UserAddressType[] = response.data.userAddresses
      setUserAddresses(userAddresses);
      console.log('userAddresses',userAddresses);
      
      const mainAddress = userAddresses.find((address) => address.isMainAddress);
      if (mainAddress) {
        setSelectedAddress(mainAddress);
      }
    } catch (error) {
      axios.isAxiosError(error)
      console.error(error)
    }
  }, [axiosInstance]);

  // Ads user address
  const handleAddAddress = async (address: UserAddressType) => {

    try {
      if (!axiosInstance)
        throw new Error("Erro na configuração do cliente HTTP.");

      // verify if the address already exists
      if (userAddresses.some((item) => item === address)) {
        toast.error("Endereço já existe.");
        return;
      }

      await axiosInstance.post("/register", address);
      fetchUserAddresses(); 
      toast.success("Endereço cadastrado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cadastrar endereço.");
    }
  };

  // Updates user address
  const handleUpdateAddress = async (address: UserAddressType) => {
    try {
      if (!axiosInstance)
        throw new Error("Erro na configuração do cliente HTTP.");

      await axiosInstance.put(`/update/${address.addressId}`, address);
      fetchUserAddresses(); 
      toast.success("Endereço alterado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao alterar endereço.");
    }
  };

  // Remove user address
  const handleRemoveAddress = async (address: UserAddressType) => {
    try {
      if (!axiosInstance)
        throw new Error("Erro na configuração do cliente HTTP.");

      await axiosInstance.put(`/delete/${address.addressId}`, address);
      fetchUserAddresses(); 
      toast.success("Endereço removido com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao remover endereço.");
    }
  };

  // Select delivery Address
  const handleSelectAddress = (address: UserAddressType) => {
    setSelectedAddress(address);
  };

  // Select delivery Type
  const handleSelectDeliveryType = (deliveryData: DeliveryInfoType) => {
    setSelectedDelivery(deliveryData);
    console.log('deliveryData:',deliveryData);
    
  };

  // Select delivery Options
  const fetchDeliveryOptions = useCallback(async (products: CartProductType[], deliveryCep:string) => {
    if (products.length === 0) return;
    try {
      const response = await axios.post(`${apiAdress}/calculate-delivery`, { products, deliveryCep }, {
        headers: {
          "Content-Type": "application/json",
          accessToken: `Bearer ${accessToken}`,
        },

      });
      setDeliveryOptions(response.data);
      return response.data;
      
    } catch (error) {
      console.error('Erro ao calcular frete:', error);
      toast.error("Erro ao buscar o carrinho");
    }
  }, [accessToken]);

  // Fetch delivery options when the selected address or selected products changes
  useEffect(() => {
    const deliveryCep = selectedAddress?.cep;
    if (deliveryCep) {
    fetchDeliveryOptions(selectedProducts, deliveryCep);
    }
  }, [selectedAddress, selectedProducts]);

  // Fetch addresses when building the component
  useEffect(() => {
    if (axiosInstance) {
      fetchUserAddresses();    
    }
  }, [axiosInstance, fetchUserAddresses]);

  // Updates axiosInstance every time that the token changes
  useEffect(() => {
    if (accessToken) {
      const instance = axios.create({
        baseURL: API_URL,
        headers: {
          "Content-Type": "application/json",
          accessToken: `Bearer ${accessToken}`,
        },
      });
      setAxiosInstance(() => instance);
    }
  }, [accessToken]);

  // Builds delivery options in localstorage
  useEffect(() => {
    const deliveryOptions = localStorage.getItem("deliveryOptions");
    if (deliveryOptions) {
      setDeliveryOptions(JSON.parse(deliveryOptions));
    }
  }, []);

  // Saves delivery options in localstorage whenever it changes
  useEffect(()=>{ 
    if (deliveryOptions) {
      localStorage.setItem("deliveryOptions", JSON.stringify(deliveryOptions));
    }
  },[deliveryOptions])

  // Sincronize delivery options between tabs
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "deliveryOptions") {
        const updatedDeliveryOptions = localStorage.getItem("deliveryOptions");
        setDeliveryOptions(updatedDeliveryOptions ? JSON.parse(updatedDeliveryOptions) : []);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Builds selected address in localstorage
  useEffect(() => {
    const storedAddress = localStorage.getItem("selectedAddress");
    if (storedAddress) {
      setSelectedAddress(JSON.parse(storedAddress));
    }
  }, []);

  // Saves selected address in localstorage whenever it changes
  useEffect(()=>{ 
    if (selectedAddress) {
      localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
    }
  },[selectedAddress])

  // Sincronize selected address between tabs
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "selectedAddress") {
        const updatedSelectedAddress = localStorage.getItem("selectedAddress");
        setSelectedAddress(updatedSelectedAddress ? JSON.parse(updatedSelectedAddress) : []);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);
  
  // Builds selected delivery type in localstorage
  useEffect(() => {
    const selectedDelivery = localStorage.getItem("selectedDelivery");
    if (selectedDelivery) {
      setSelectedDelivery(JSON.parse(selectedDelivery));
    }
  }, []);

  // Saves selected delivery type in localstorage whenever it changes
  useEffect(()=>{ 
    if (selectedDelivery) {
      localStorage.setItem("selectedDelivery", JSON.stringify(selectedDelivery));
    }
    console.log('selectedDelivery:',selectedDelivery);
  },[selectedDelivery])

  // Sincronize selected delivery between tabs
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "selectedDelivery") {
        const updatedSelectedDelivery = localStorage.getItem("selectedDelivery");
        setSelectedDelivery(updatedSelectedDelivery ? JSON.parse(updatedSelectedDelivery) : []);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  


  //   DEBBUGING      ###################################

  // // watch changes in selectedDelivery
  // useEffect(()=>{ 
  //   console.log('selectedDelivery:',selectedDelivery);
  // },[selectedDelivery])

  // // watch changes in selectedAddress
  useEffect(()=>{ 
    console.log('selectedAddress:',selectedAddress);
  },[selectedAddress])

  // // watch changes in deliveryOptions
  // useEffect(()=>{ 
  //   console.log('deliveryOptions:',deliveryOptions);
  // },[deliveryOptions])



  return (
    <AddressContext.Provider
      value={{
        fetchUserAddresses,
        userAddresses,
        selectedAddress,
        selectedDelivery,
        fetchDeliveryOptions,
        deliveryOptions,
        handleSelectAddress,
        handleSelectDeliveryType,
        handleAddAddress,
        handleRemoveAddress,
        handleUpdateAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddress deve ser usado dentro de AddressProvider");
  }''
  return context;
};
