// // lib/yookassa.ts
// import axios from "react-native";
// import { v4 as uuidv4 } from "uuid";

// const SHOP_ID = process.env.YOOKASSA_SHOP_ID!;
// const SECRET_KEY = process.env.YOOKASSA_SECRET_KEY!;

// // Basic auth credentials
// const auth = Buffer.from(`${SHOP_ID}:${SECRET_KEY}`).toString("base64");

// const api = axios.create({
//   baseURL: "https://api.yookassa.ru/v3",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Basic ${auth}`,
//   },
// });

// export async function createPayment(
//   amount: number,
//   description: string,
//   orderId: string,
//   returnUrl: string
// ) {
//   const idempotenceKey = uuidv4();

//   const response = await api.post(
//     "/payments",
//     {
//       amount: {
//         value: (amount / 100).toFixed(2),
//         currency: "RUB",
//       },
//       capture: true,
//       confirmation: {
//         type: "redirect",
//         return_url: returnUrl,
//       },
//       description,
//       metadata: {
//         order_id: orderId,
//       },
//     },
//     {
//       headers: {
//         "Idempotence-Key": idempotenceKey,
//       },
//     }
//   );

//   return response.data;
// }

// export async function getPayment(paymentId: string) {
//   const response = await api.get(`/payments/${paymentId}`);
//   return response.data;
// }
