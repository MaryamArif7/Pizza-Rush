import { SheetContent, SheetHeader, SheetTitle } from "../components/ui/sheet";
import { useNavigate } from "react-router-dom";
import CartItemsContent from "./CartItemsContent";
function CartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();
  console.log("Hello from cart wrapper", cartItems);
  const totalCartAmount = cartItems.reduce(
    (sum, currentItem) =>
      sum + (currentItem?.price || 0) * (currentItem?.quantity || 0),
    0
  );

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 via-red-500 to-orange-500 text-transparent bg-clip-text">
          Your Cart
        </SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4 max-h-[400px] overflow-y-auto">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => (
              <CartItemsContent cartItem={item} key={item?._id} />
            ))
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="text-yellow-600 font-bold">Total</span>
          <span className="text-yellow-400 font-bold">{totalCartAmount}</span>
        </div>
      </div>
      <button
        onClick={() => {
          navigate("/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6 bg-yellow-500 text-white py-2 rounded hover:bg-red-600"
      >
        Checkout
      </button>
    </SheetContent>
  );
}

export default CartWrapper;
