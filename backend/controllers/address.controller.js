import Address from "../models/address.model";
export const addAddress = async (req, res) => {
  try {
    const { id, address, city, phone, notes } = req.body;
    if (!id || !address || !city || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Please Provide All required Data",
      });
    }
    const newAddress = new Address({
      id,
      address,
      city,
      phone,
      notes,
    });
    await newAddress.save();
    return res.status(201).json({
      success: true,
      message: "Your Address Has been saved",
      data: newAddress,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      sucess: false,
      message: "Internal Server Error ,try again",
    });
  }
};
export const fetchAddress = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please Provide all the required Data",
      });
    }
    const findAddress = await Address.findById(id);
    return res.status(200).json({
      success: true,
      message: "Address is found from the server",
      data: findAddress,
    });
  } catch (error) {
    console.log | ("error", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error,Try Again!",
    });
  }
};
export const editAddress = async (req, res) => {
try{
    const { id, addressId } = req.params;
    const formData = req.body;
    if (!id || !addressId || !formData) {
      return res.status(400).json({
        success: false,
        message: "Please Provide All the data",
      });
    }
    const address = await Address.findAndUpdate({
      _id: addressId,
      id,
    },
  formData,
  {new:true}
  );
  if(!address){
      return res.status(400).json({
          success:false,
          message:"Address Not Found"
      })
  }
  res.status(200).json({
      success:true,
      data:address,
  })
 
}
catch(error){
    console.log("Error",error);
    return res.status(500).json({
        success:false,
        message:"Internal Server Error Please Try Again"
    });
  }
};
export const deleteAddress = async (req, res) => {
try{
    const {id,addressId}=req.params;
if(!id || !addressId){
    return res.status(400).json({
        sucess:false,
        message:"Please Provide All The Required Data",
    
    });
}
const address=await Address.findAndDelete({_id:addressId,id});
if(!address){
    return res.status(400).json({
  success:false,
  message:"Address  Not Found",
    });

}
res.status(200).json({
    success:true,
    message:"Address Has Been Deleted Successfully",
})
}
catch(error){
    console.log("Error",error);
    return res.status(500).json({
        success:false,
        message:"Internal Server Error While Deleting Address"
    })
}
}
