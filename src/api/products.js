import axios from ".";


export const getProductsApi = async () => {
    const response = await axios.get("https://dummyjson.com/products");
    return response.data;
}