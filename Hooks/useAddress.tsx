import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import axios, { AxiosInstance } from "axios";
import {  UserAddressType } from "@/utils/types";
import toast from "react-hot-toast";
import apiAdress from "@/utils/api";
import { useAuth } from "@/Contexts/AuthContext";

interface AddressContextType {
  userAddresses:  UserAddressType[];
  selectedAddress:  UserAddressType | null;
  fetchUserAddresses: () => void;
  handleSelectAddress: (address: UserAddressType) => void;
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
  const [userAddresses, setUserAddresses] = useState<UserAddressType[]>([]);
  const { accessToken } = useAuth()
  const [axiosInstance, setAxiosInstance] = useState<AxiosInstance | null>(null);  

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


  // Select delivery Address
  const handleSelectAddress = (address: UserAddressType) => {
    setSelectedAddress(address);
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

  // Recovers the token from localStorage when building the component
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const storedToken = localStorage.getItem("accessToken");
  //     setToken(storedToken);
  //   }
  // }, []);


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

  //whatch selectedAdress
  useEffect(()=>{ 
    if (selectedAddress) {
      localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
    }
    console.log('selectedAddress:',selectedAddress);
  },[selectedAddress])

  useEffect(() => {
    const storedAddress = localStorage.getItem("selectedAddress");
    if (storedAddress) {
      setSelectedAddress(JSON.parse(storedAddress));
    }
  }, []);

  return (
    <AddressContext.Provider
      value={{
        fetchUserAddresses,
        userAddresses,
        selectedAddress,
        handleSelectAddress,
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
