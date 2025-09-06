import toast from "react-hot-toast";
import { catalogData, categories } from "../api";
import { apiConnector } from "../apiConnector";
const url=categories.CATEGORIES_API;
const{CATALOGPAGEDATA_API}=catalogData

const getAllCategory=async()=>{
    try {
        const response=await apiConnector("GET",url)
        return response
    } catch (error) {
        console.log("error while fetching category",error);
    } 
    
    
}

export const getCategoryPageDetails=async(data)=>{
    let result;
    const toastId=toast.loading("Loading...");
    try {
        const response=await apiConnector("GET",CATALOGPAGEDATA_API,null,null,{
            categoryName:data
        })

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        console.log("CATALOGPAGE RESPONSE......",response);
        result=(response?.data?.data);
        
        
    } catch (error) {
        console.log("CATALOGPAGE ERROR......",error);

        
    }finally{
        toast.dismiss(toastId)
        return result;
    }
    
}

export default getAllCategory;
