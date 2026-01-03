
import stripe from "../../config/stripeConfig";



import { Request, Response } from "express";


export class PaymentController {

  public createPaymentIntent = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { amount } = req.body;

      if (!amount) {
        res.status(400).json({ error: "Amount is required" });
        return;
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // convert to paise
        currency: "inr",
        automatic_payment_methods: { enabled: true },
      });

      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
      });

    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };
}
