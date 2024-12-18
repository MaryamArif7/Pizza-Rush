import Address from "@/components/Address";
import {  useSelector } from "react-redux";
import CartItemsContent from "../components/CartItemsContent";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const { toast } = useToast();

  const totalCartAmount = Array.isArray(cartItems)
  ? cartItems.reduce(
      (sum, currentItem) =>
        sum + (currentItem?.price || 0) * (currentItem?.quantity || 0),
      0
    )
  : 0;

  const stripePromise = loadStripe(
"pk_test_51PndnzALl3DH2NktDNpr3OFgQVntLUxLN3dqndao2GgUGQXEjm9Hftf2QBZvsYhAm15ydz32mR6gMRJPrakqcyke00lJS1pzWw"
);
  const handleInitiatePaypalPayment=async()=> {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });

      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });

      return;
    }

    const orderData = {
      userId: user?._id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((cartItem) => ({
        menuId: cartItem?.productId,
        name: cartItem?.name,
        image: cartItem?.image,
        price:cartItem?.price,
        quantity:cartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "Card",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };
    const stripe = await stripePromise;
    const res = await axios.post("/api/payment/checkoutSession", {
        order: orderData,

    });

    const session = res.data;
    const result = await stripe.redirectToCheckout({
        sessionId: session.id,
    });

    if (result.error) {
        console.error("Error:", result.error);
        setIsPaymentStart(false);
    }
   
  }



  return (
    <div className="flex flex-col">
       
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <CartItemsContent cartItem={item} key={item.id}/>
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <button onClick={handleInitiatePaypalPayment} className="w-full">
              {isPaymentStart
                ? "Processing Payment..."
                : "Checkout with Stripe"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
