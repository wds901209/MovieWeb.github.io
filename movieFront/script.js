const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8a08b3650264f55c48fe04e5cce34d44&page=1';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=8a08b3650264f55c48fe04e5cce34d44&query=";;

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");


returnMovies(APILINK);
function returnMovies(url) {
  // 發送 GET 請求到指定的 URL，並等待回應
  fetch(url)
    .then(res => res.json()) // 將回應解析成 JSON 格式
    .then(function(data) { // 當解析完成後，執行這個函式
      console.log(data.results); // 將從 API 返回的資料中的 results 部分輸出到控制台
      // 對每一個電影資料執行以下操作
      data.results.forEach(element => {
        // 創建一個新的 <div> 元素，用於顯示電影資料
        const div_card = document.createElement('div');
        div_card.setAttribute('class', 'card');

        const div_row = document.createElement('div');
        div_row.setAttribute('class', 'row');

        const div_column = document.createElement('div');
        div_column.setAttribute('class', 'column');

        const image = document.createElement('img');
        image.setAttribute('class', 'thumbnail');
        image.setAttribute('id', 'image');

        const title = document.createElement('h3');
        title.setAttribute('id', 'title');

        const center = document.createElement('center');
        // center.setAttribute('class', 'center');



        title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">reviews</a>`;
        //?代表查詢字串的開始，後面可以跟著很多參數，用來向URL傳遞信息
        image.src = IMG_PATH + element.poster_path;

        // 將(img/title/..)添加到center/card/..容器中
        center.appendChild(image);
        div_card.appendChild(center);
        div_card.appendChild(title);
        div_column.appendChild(div_card);
        div_row.appendChild(div_column);

        // 將創建的 div_row 元素添加到名為 main 的父元素中
        main.appendChild(div_row);
      });
    });
}

form.addEventListener("submit", (e) => {
  // 阻止表單的默認提交行為
  e.preventDefault();
  // 清空該區域中的所有內容，以便在表單提交後顯示新的內容或狀態
  main.innerHTML = '';

  const searchItem = search.value;

  if (searchItem) {
    returnMovies(SEARCHAPI + searchItem);
    search.value = "";
  }
});