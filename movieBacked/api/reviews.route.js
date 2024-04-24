//負責定義與 /api/v1/reviews 路徑相關的路由和處理請求的邏輯
import express from "express"; // 引入 express 模組，這個模組用於建立 web 應用程序和定義路由
import ReviewsCtrl from "./reviews.controller.js";

const router = express.Router(); // 建立一個路由器（Router）實例，它可將路由分組到一個模塊中，以便更好地組織代碼和路由

router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews); //get該電影的所有評論 (:id電影對照參數)
router.route("/new").post(ReviewsCtrl.apiPostReview); //新增評論
router
  .route("/:id") //當使用者搜尋電影名稱時會對應到:id，並同時調用三個方法，讓使用者可以做這些動作
  .get(ReviewsCtrl.apiGetReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview);

// router.route("/").get((req, res) => res.send("hello world"));
// 定義路由，當接收到 GET 請求時，對應的處理函數將返回 "hello world" 字符串
// - router.route("/") 指定了路由的路徑，這裡是根路徑 "/"

export default router; //其他文件中可以引入和使用
