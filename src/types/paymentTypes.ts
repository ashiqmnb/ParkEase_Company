export interface PaymentData {
   razorpay_order_id: string;
   razorpay_payment_id: string;
   razorpay_signature: string;
}

export interface Transaction {
   coin: number;
   description: string;
   receiverId: string;
   senderId: string;
   status: string;
   transactionId: string;
   date: string;
}
