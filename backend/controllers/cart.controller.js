import Cart from "../models/cart.model.js";
import MenuModel from "../models/menu.model.js";

export const addToCart = async (req, res) => {
  try {
    const { userId, MenuId, quantity } = req.body;

    if (!userId || !MenuId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please Provide Valid User Id, Menu Id, and also provide the quantity",
      });
    }

    const menu = await MenuModel.findById(MenuId);
    if (!menu) {
      return res.status(400).json({
        success: false,
        message: "Error in Finding the Menu Item",
      });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const currentIndex = cart.items.findIndex((item) => item.MenuId.toString() === MenuId);
    if (currentIndex === -1) {
      cart.items.push({ MenuId, quantity });
    } else {
      cart.items[currentIndex].quantity += quantity;
    }

    await cart.save();
    res.status(200).json({
      success: true,
      message: "Your Pizza has been added to the cart successfully",
      data: cart,
    });
  } catch (error) {
    console.log("Error while adding the Menu item:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server error, There is an error while adding the Items in the cart",
    });
  }
};

export const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Please provide the valid User Id",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.MenuId",
      select: "image name price description",
    });

    if (!cart) {
      return res.status(400).json({
        success: false,
        message: "Cart with this user Id is not found",
      });
    }

    const validItems = cart.items.filter((item) => item.MenuId);
    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const frontendData = validItems.map((item) => ({
      MenuId: item.MenuId._id,
      image: item.MenuId.image,
      name: item.MenuId.name,
      price: item.MenuId.price,
      description: item.MenuId.description,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      message: "Data is fetched successfully",
      data: {
        ...cart._doc,
        items: frontendData,
      },
    });
  } catch (error) {
    console.log("There is an error while fetching the pizza from the database:", error);
    res.status(500).json({
      success: false,
      message: "There is an error while fetching your menu item from the database, please try again",
    });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { userId, MenuId, quantity } = req.body;

    if (!userId || !MenuId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Please Provide all the data",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(400).json({
        success: false,
        message: "Cart is not found",
      });
    }

    const indexOfItemsInTheArray = cart.items.findIndex(
      (item) => item.MenuId.toString() === MenuId
    );

    if (indexOfItemsInTheArray === -1) {
      return res.status(400).json({
        success: false,
        message: "Menu Item is not present in the cart",
      });
    }

    cart.items[indexOfItemsInTheArray].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: "items.MenuId",
      select: "image name price quantity description",
    });

    const frontendData = cart.items.map((item) => ({
      MenuId: item.MenuId ? item.MenuId._id : null,
      image: item.MenuId ? item.MenuId.image : null,
      description: item.MenuId ? item.MenuId.description : null,
      name: item.MenuId ? item.MenuId.name : null,
      price: item.MenuId ? item.MenuId.price : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      message: "Cart Updated Successfully",
      data: {
        ...cart._doc,
        items: frontendData,
      },
    });
  } catch (error) {
    console.error("Error while updating cart:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server error while updating cart",
    });
  }
};
export const deleteCartItem = async (req, res) => {
    try {
      const { userId, MenuId } = req.params;
  
      if (!userId || !MenuId) {
        return res.status(400).json({
          success: false,
          message: "Please Provide all the data",
        });
      }
  
      const cart = await Cart.findOne({ userId }).populate({
        path:"items.MenuId",
        select:"image name price description"
      });
      if (!cart) {
        return res.status(400).json({
          success: false,
          message: "Cart is not found",
        });
      }
  
        cart.items = cart.items.filter(
    //  const indexOfItemsInTheArray = cart.items.findIndex(
        (item) => item.MenuId.toString() === MenuId
      );
  
       await cart.save();
  
      await cart.populate({
        path: "items.MenuId",
        select: "image name price quantity description",
      });
  
      const frontendData = cart.items.map((item) => ({
        MenuId: item.MenuId ? item.MenuId._id : null,
        image: item.MenuId ? item.MenuId.image : null,
        description: item.MenuId ? item.MenuId.description : null,
        name: item.MenuId ? item.MenuId.name : null,
        price: item.MenuId ? item.MenuId.price : null,
        quantity: item.quantity,
      }));
  
      res.status(200).json({
        success: true,
        message: "Cart Updated Successfully",
        data: {
            ...cart._doc,
            items: frontendData,
          },
      
      });
    } catch (error) {
      console.error("Error while Deleting the Menu Item in the  cart:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server error while delteing from the  cart",
      });
    }
  };
  
