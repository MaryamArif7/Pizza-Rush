import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus, Trash } from "lucide-react";
import { deleteCartItems, updateCartQuantity } from "../redux/cartSlice";
import { useToast } from "./ui/use-toast"
function CartItemsContent({ cartItem }) {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  console.log("HELLO FROM CART ITEMS CONTENT", cartItem);
  console.log(
    " checking in cartitemcontent for Price:",
    cartItem?.price,
    "Quantity:",
    cartItem?.quantity
  );

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentCartItem = getCartItems.findIndex(
        //item.menuId
        //showing undefined with _id
        (item) => item.menuId === getCartItem?.menuId
       
      );

      if (indexOfCurrentCartItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;

        if (typeOfAction === "plus") {
          getCartItems[indexOfCurrentCartItem].quantity = getQuantity + 1;
        } else if (typeOfAction === "minus" && getQuantity > 1) {
          getCartItems[indexOfCurrentCartItem].quantity = getQuantity - 1;
        }
      }
    }
    dispatch(
      updateCartQuantity({
        userId: user?._id,
        menuId: getCartItem?.menuId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart Item is updated Successfully",
        });
      }
    });
  }

  
    function handleCartItemDelete(getCartItem) {
      console.log("from delete handle", user?._id, getCartItem?.menuId);
      dispatch(
        deleteCartItems({ userId: user?._id, menuId: getCartItem?.menuId })
      ).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Cart item is  deleted successfully",
          });
        }
      });
    
    
    }
    
  

  return (
    <div className="flex items-center space-x-4">
      <img
        src={`http://localhost:5000/${cartItem?.image}`}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="text-yellow-600">{cartItem?.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <button
            className="h-8 w-8 rounded-full"
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4 text-red-600" />
            <span className="sr-only">Decrease</span>
          </button>
          <span className="text-orange-600">{cartItem?.quantity}</span>
          <button
            className="h-8 w-8 rounded-full"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4 text-yellow-600" />
            <span className="sr-only">Increase</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold text-yellow-600">
          {((cartItem?.price || 0) * (cartItem?.quantity || 0)).toFixed(2)}
        </p>
      </div>

      <Trash
        onClick={() => handleCartItemDelete(cartItem)}
        className="cursor-pointer text-yellow-600 mt-1"
        size={20}
      />
    </div>
  );
}

export default CartItemsContent;
