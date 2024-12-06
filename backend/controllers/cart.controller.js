import Cart from "../models/cart.model.js";
import MenuModal from "../models/menu.model.js"; 

export const addToCart = async (req, res) => {
  try {
    const { id, menuId, quantity } = req.body;

    if (!id || !menuId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid User ID, Menu ID, and a valid quantity.",
      });
    }

    const menu = await MenuModal.findById(menuId);
    if (!menu) {
      return res.status(400).json({
        success: false,
        message: "Error finding the menu item.",
      });
    }

    let cart = await Cart.findOne({ id });
    if (!cart) {
      cart = new Cart({ id, items: [] });
    }

    const currentIndex = cart.items.findIndex((item) => item.menuId.toString() === menuId);
    if (currentIndex === -1) {
      cart.items.push({ menuId, quantity });
    } else {
      cart.items[currentIndex].quantity += quantity;
    }

    await cart.save();
    res.status(200).json({ 
      success: true,
      message: "Your pizza has been added to the cart successfully.",
      data: cart,
    });
  } catch (error) {
    console.log("Error while adding the menu item:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while adding items to the cart.",
    });
  }
};

export const fetchCartItems = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid User ID.",
      });
    }

    const cart = await Cart.findOne({ id }).populate({
      path: "items.menuId",
      select: "image name price description",
    });

    if (!cart) {
      return res.status(400).json({
        success: false,
        message: "Cart with this user ID is not found.",
      });
    }

    const validItems = cart.items.filter((item) => item.menuId);
    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const frontendData = validItems.map((item) => ({
      menuId: item.menuId._id,
      image: item.menuId.image,
      name: item.menuId.name,
      price: item.menuId.price,
      description: item.menuId.description,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      message: "Data fetched successfully.",
      data: {
        ...cart._doc,
        items: frontendData,
      },
    });
  } catch (error) {
    console.log("Error while fetching the cart items:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching cart items.",
    });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { id, menuId, quantity } = req.body;

    if (!id || !menuId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required data.",
      });
    }

    const cart = await Cart.findOne({ id });
    if (!cart) {
      return res.status(400).json({
        success: false,
        message: "Cart not found.",
      });
    }

    const indexOfItemsInTheArray = cart.items.findIndex(
      (item) => item.menuId.toString() === menuId
    );

    if (indexOfItemsInTheArray === -1) {
      return res.status(400).json({
        success: false,
        message: "Menu item is not present in the cart.",
      });
    }

    cart.items[indexOfItemsInTheArray].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: "items.menuId",
      select: "image name price quantity description",
    });

    const frontendData = cart.items.map((item) => ({
      menuId: item.menuId ? item.menuId._id : null,
      image: item.menuId ? item.menuId.image : null,
      description: item.menuId ? item.menuId.description : null,
      name: item.menuId ? item.menuId.name : null,
      price: item.menuId ? item.menuId.price : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      message: "Cart updated successfully.",
      data: {
        ...cart._doc,
        items: frontendData,
      },
    });
  } catch (error) {
    console.error("Error while updating the cart:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while updating the cart.",
    });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { id, menuId } = req.params;

    if (!id || !menuId) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required data.",
      });
    }

    const cart = await Cart.findOne({ id }).populate({
      path: "items.menuId",
      select: "image name price description",
    });
    if (!cart) {
      return res.status(400).json({
        success: false,
        message: "Cart not found.",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.menuId.toString() !== menuId
    );

    await cart.save();

    await cart.populate({
      path: "items.menuId",
      select: "image name price quantity description",
    });

    const frontendData = cart.items.map((item) => ({
      menuId: item.menuId ? item.menuId._id : null,
      image: item.menuId ? item.menuId.image : null,
      description: item.menuId ? item.menuId.description : null,
      name: item.menuId ? item.menuId.name : null,
      price: item.menuId ? item.menuId.price : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      message: "Cart item deleted successfully.",
      data: {
        ...cart._doc,
        items: frontendData,
      },
    });
  } catch (error) {
    console.error("Error while deleting the menu item in the cart:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while deleting from the cart.",
    });
  }
};
