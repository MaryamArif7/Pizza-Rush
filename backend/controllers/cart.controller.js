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
      message: "Your Pizza has been added to the cart Successfully",
      data: cart,
    });
  } catch (error) {
    console.log("Error while adding the Menu item");
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
    console.log("There is an error while fetching the pizza from the database");
    res.status(400).json({
      success: false,
      message: "There is an error while fetching your menu item from the database, please try again",
    });
  }
};
