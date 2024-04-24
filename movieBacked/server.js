//端口(負責創建 Express 應用程序，配置中介軟體和路由，並啟動伺服器來監聽請求)
import express from "express";
import cors from "cors";
import reviews from "./api/reviews.route.js";

const app = express();

// 定義允許的來源
// const allowedOrigins = [
//   "https://9e85afee-eaaa-4ea6-ad21-6df169e799a1-00-32yhncsdxdxkg.pike.replit.dev",
// ];

// 使用 CORS 中間件，允許跨域請求
app.use(cors());
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // 檢查請求的來源是否在允許的清單中，如果是，則允許
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   }),
// );

app.use(express.json()); // 使用內置的 express.json() 中間件，解析請求的 JSON 格式主體並提供給路由處理程序使用

// 使用名為 reviews 的模組作為中間件，並映射到 "/api/v1/reviews" 路徑，以處理相關的請求
app.use("/api/v1/reviews", reviews);

app.use("*", (req, res) => res.status(404).json({ error: "not found" }));
// 當所有路由都不匹配時，使用此中間件處理 404 錯誤，返回 "not found" 的 JSON 格式錯誤訊息
// app.use("*", ...)：這表示匹配所有路径的請求，因 * 是一個通用符，匹配所有路徑
// (req, res) => res.status(404).json({ error: "not found"})：這是一個中間件函數，它接收請求物件 (req) 和回應物件 (res) 作為參數。當請求到達伺服器時，如果之前定義的路由都沒有匹配到這個請求，Express 就會執行這個中間件函數

export default app;

/*
在server.js中，app是整個Express應用程序的實例，並且負責處理所有的路由和中介軟體。

1.使用 cors 中介軟體，允許跨域請求。
2.使用內置的 express.json() 中介軟體，解析請求的 JSON 格式主體並提供給路由處理程序使用。
3.使用 app.use 將 /api/v1/reviews 路徑映射到 reviews 路由器，負責處理與該路徑相關的請求。  接著調用  
  reviews.route.js
4.定義了一個 404 錯誤處理中介軟體，當所有路由都不匹配時，將返回 "not found" 的 JSON 格式錯誤訊息。
*/
