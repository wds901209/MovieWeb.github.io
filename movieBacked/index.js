// connect database and start the server
import app from "./server.js";
import mongodb from "mongodb";
import ReviewsDAO from "./dao/reviewsDAO.js"; //DAO: Data Access Object

const MongoClient = mongodb.MongoClient;
//當使用 MongoDB 客戶端驅動程式時，需使用 MongoClient 類別來建立與 MongoDB server的連接
//可當作資料庫（MongoDB）和程式（Node.js 應用程式）間的橋樑
//提供了一個介面，讓 Node.js 程式能夠與 MongoDB 數據庫進行通信，執行查詢、插入、更新和刪除等操作。
const mongo_username = process.env["MONGO_USERNAME"];
const mongo_password = process.env["MONGO_PASSWORD"];
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.pfyz8qc.mongodb.net/?retryWrites=true&w=majority`;

const port = 8000;

MongoClient.connect(uri, {
  maxPoolSize: 50, //設定連線池的最大連線數，這會限制連線數量，避免連線數量過多造成連線失效
  wtimeoutMS: 2500, //設定連線的最大等待時間，這會限制連線的等待時間，避免連線失效
  useNewUrlParser: true,
})
  //function(){} 是傳統的js函數定義方式，而.xxx( xxx => {....}) 是ES6中引入的箭頭函數語法。更簡潔，且具固定的 this绑定及回調函數（Callback Function）
  //Callback Function:一種被傳遞給其他函數作為參數，並在該函數執行完成後被調用的函數。常用於異步編程中，例如在事件處理器中或是定時器函數中。回調函數的主要目的是在特定的情況下被調用，以執行某些操作
  .catch((err) => {
    console.error(err.stack);
    process.exit(1); //終止 Node.js 應用程序的運行，並且以指定的退出碼（1）退出程序
  })
  .then(async (client) => {
    await ReviewsDAO.injectDB(client); //user登入後會先與資料庫進行連接，以利這個user要做什麼新增評論、刪除評論等操作
    app.listen(port, () => {
      //start server
      console.log(`listening on port ${port}`);
    });
  });

/*
在index.js中，當你按下run時，會依次執行以下操作：

1.導入 app 從 server.js，這個 app 是整個 Express 應用程序的實例。
2.導入 mongodb 和 ReviewsDAO 用於與資料庫建立連接和初始化資料庫。
3.從環境變數中獲取 MongoDB 的用戶名和密碼。
4.使用 MongoClient.connect 建立與 MongoDB 伺服器的連接，並設置一些連接參數。
5.如果連接出現錯誤，則輸出錯誤訊息並終止應用程式。
6.如果連接成功，則注入資料庫到 ReviewsDAO 中。
7.啟動 Express 伺服器，並監聽指定的端口（在這裡是 8000）。

接著調用server.js
*/
