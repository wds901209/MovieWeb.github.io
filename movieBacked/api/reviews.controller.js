//user端的請求及回應
import ReviewsDAO from "../dao/reviewsDAO.js";

//處理使用者提交評論的操作
export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const moviedId = req.body.movieId;
      const review = req.body.review;
      const user = req.body.user;

      //使用ReviewsDAO的addReview方法將這些新評論新增到資料庫中
      //await : 停止執行後續的code，直到addReview方法執行好
      const reviewResponse = await ReviewsDAO.addReview(moviedId, user, review);
      //user成功提交評論後，server回傳一個json格式的回應給user，表示操作成功的狀態消息
      res.json({ status: "success" });
    } catch (e) {
      //若user 輸入有誤
      res.status(500).json({ error: e.message });
    }
  }

  //取得一部電影的特定評論
  static async apiGetReview(req, res, next) {
    //因router.route("/:id")
    try {
      let id = req.params.id || {};
      let review = await ReviewsDAO.getReview(id);
      if (!review) {
        res.status(404).json({ error: "Not found" });
      }
      res.json(review);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e }); //全部錯誤消息接回傳給user
    }
  }

  //更新評論
  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.params.id; //獲取評論
      const review = req.body.review; //獲取評論內容
      const user = req.body.user; //獲取誰評論

      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        user,
        review,
      );
      // 若返回錯誤
      var { error } = reviewResponse;
      if (error) {
        res.status(404).json({ error });
      }
      //若未對評論進行任何修改
      if (reviewResponse.modifiedCount === 0) {
        //拋出error 接著跳過正確的情況，直接執行catch
        throw new Error("unable to update review");
      }
      //若皆正確
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message }); //僅將錯誤消息傳回給user
    }
  }

  //刪除評論
  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.params.id;
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  //取得一部電影的所有評論
  static async apiGetReviews(req, res, next) {
    try {
      let id = req.params.id || {};
      let reviews = await ReviewsDAO.getReviewsByMovieId(id);
      if (!reviews) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(reviews);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}

/*
req.body用來存取的 POST 表單送出的資料

req.params當參數存在 URL 網址中時使用
當使用路由路徑中的參數時，例如 /:id，這些參數的值就可以透過 req.params 屬性來獲取。
例如，對於路徑 /users/:id，如果客戶端向該路徑發送請求 /users/123，則 req.params.id 將是 "123"。

req.query用於獲取 URL 中的查詢字串
查詢字串參數是在 URL 中以 `?` 開始，並以 `&` 分隔的鍵值對。例如，對於 URL /search?keyword=apple&page=1，查詢字串參數包括 keyword 和 page，它們的值分別是 "apple" 和 "1"。
*/
