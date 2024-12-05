import MenuModal from "../models/menu.model.js"

export const Menu=async(req,res)=>{
    try{
  const data=await MenuModal.find();
  console.log("Fetched Menu itmes from the database");
  return res.status(200).json(data);
 

}
    catch(error){
  console.log("Error While Fetching Menu items from the data",error)
    }
}
export const menuDetails = async (req, res) => {
  try {
    const { id } = req.params; 
    console.log("Params received:", req.params);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Menu ID is required",
      });
    }

    const menu = await MenuModal.findById(id);

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
  } catch (error) {
    console.error("Error fetching menu details:", error);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};
