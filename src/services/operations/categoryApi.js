import { categories } from "../api";
import { apiConnector } from "../apiConnector";
const url=categories.CATEGORIES_API;

const getAllCategory=async()=>{
    try {
        const response=await apiConnector("GET",url)
        return response
    } catch (error) {
        console.log("error while fetching category",error);
    } 
    
    
}

export default getAllCategory;