import MenuModel from "../models/menu.modal.js"

export const Menu=async(req,res)=>{
    try{
  const data=await MenuModel.find();
  return res.status(200).json(data);
  console.log("Fetched Menu itmes from the database")

}
    catch(error){
  console.log("Error While Fetching Menu items from the data",error)
    }
}