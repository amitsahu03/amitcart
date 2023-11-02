import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from "react";
import { getAllProducts } from "../../Services";


const ProductsContext = createContext();


export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllProducts(setProducts, setIsLoading);
  }, []);

  const productsList = products;

  return (
    <ProductsContext.Provider
      value={{
        isLoading,
        setIsLoading,
        productsList,
        products
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
