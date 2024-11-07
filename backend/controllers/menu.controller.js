import MenuModel from "../models/menu.model.js"

export const Menu=async(req,res)=>{
    try{
  const data=await MenuModel.find();
  console.log("Fetched Menu itmes from the database");
  return res.status(200).json(data);
 

}
    catch(error){
  console.log("Error While Fetching Menu items from the data",error)
    }
}