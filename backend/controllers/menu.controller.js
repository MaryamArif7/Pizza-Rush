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
export const MenuDetails = async (req, res) => {
  try {
    const { MenuId } = req.params; 
    const menu = await MenuModel.findById(MenuId);

    if (!menu) {
      return res.status(400).json({
        success: false,
        message: "Menu item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Here is your item for details",
      data: menu,
    });
  } catch (e) {
    console.log(e); 
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};
