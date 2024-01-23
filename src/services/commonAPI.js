//import axios
import axios from "axios";

export const commonAPI = async(httprequest,url,reqBody,reqHeader)=>{
   const reqConfig = {
     method:httprequest,
     url,
     data:reqBody,
     headers:reqHeader?reqHeader:{"Content-Type":"application/json"}    //this project contain 2 types of contents have to upload
    
   }
   
   return await axios(reqConfig).then((result)=>{
    return result
   }).catch((err)=>{
    return err
   })
  
}