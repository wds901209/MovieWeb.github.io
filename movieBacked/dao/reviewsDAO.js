//mongodb資料庫操作
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID; ////為了把user輸入的int or string 轉換成 objectID/d

let reviews;

export default class ReviewsDAO {
  //確保在執行任何與評論相關的資料庫操作之前，應用程式已成功地建立了與資料庫的連接
  static async injectDB(conn) {
    if (reviews) {
      //正常conncet
      return;
    }
    try {
      //不能正常connect
      reviews = await conn.db("reviews").collection("reivews");
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }

  static async addReview(movieId, user, review) {
    try {
      //評論內容以及使用者的相關資訊
      const reviewDoc = {
        //創一個叫reviewDoc的obj
        movieId: movieId,
        user: user,
        review: review,
      };

      return await reviews.insertOne(reviewDoc); //mongodb command
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  static async getReview(reviewId) {
    try {
      //使用 reviews obj（從資料庫連接中取得)的findOne方法來找到符合指定_id的評論。
      //_id是MongoDB中文檔的唯一識別符，通常由 MongoDB 生成的 ObjectId。
      //在這裡，ObjectId(reviewId)將reviewId轉換為MongoDB中的ObjectId 類型，以便與          資料庫中的_id欄位進行匹配。
      return await reviews.findOne({ _id: ObjectId(reviewId) });
    } catch (e) {
      console.error(`Unable to get review: ${e}`);
      return { error: e };
    }
  }

  static async updateReview(reviewId, user, review) {
    try {
      const updateResponse = await reviews.updateOne(
        { _id: ObjectId(reviewId) },
        { $set: { user: user, review: review } },
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(reviewId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: ObjectId(reviewId), //傳遞一個物件作為參數
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to detele review: ${e}`);
      return { error: e };
    }
  }

  //在資料庫中找特定電影的影評
  static async getReviewsByMovieId(movieId) {
    try {
      const cursor = await reviews.find({ movieId: parseInt(movieId) });
      return cursor.toArray(); //將cursor中的結果轉成array。並返回所有符合條件的評論
    } catch (e) {
      console.error(`Unable to get review: ${e}`);
      return { error: e };
    }
  }
}
