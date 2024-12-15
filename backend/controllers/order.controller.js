import Order from "../models/order.model.js";
import { stripe } from "../lib/stripe.js";

export const checkoutSession = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    if (!userId || !cartItems || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data: userId and cartItems are required.",
      });
    }

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
      metadata: {
        userId,
        cartId,
        orderStatus,
        paymentMethod,
        paymentStatus,
        totalAmount,
        orderDate,
        orderUpdateDate,
        paymentId,
        payerId,
        cartItems: JSON.stringify(
          cartItems.map((item) => ({
            id: item._id,
            quantity: item.quantity,
            price: item.price,
          }))
        ),
      },
    });

    const order = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      stripeSessionId: session.id,
    });

    await order.save();

    res.status(200).json({ id: session.id, totalAmount });
  } catch (error) {
    console.error("Error while creating the checkout session:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the checkout session.",
    });
  }
};

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "Session ID is required.",
      });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const orderDetails = {
        userId: session.metadata.userId,
        amount: session.amount_total / 100,
        currency: session.currency,
        paymentStatus: session.payment_status,
        items: JSON.parse(session.metadata.cartItems),
      };

      await Order.updateOne(
        { stripeSessionId: session.id },
        { paymentStatus: "paid" }
      );

      return res.status(200).json({
        message: "Payment successful and order saved!",
        orderDetails,
      });
    } else {
      return res.status(400).json({
        message: "Payment not completed. Please try again.",
      });
    }
  } catch (error) {
    console.error("Error in checkoutSuccess:", error);
    res.status(500).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
};
