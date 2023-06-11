console.log("hello");
const API_KEY = "ab3a0bc70fc545e083ddbe7f53426d38";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  //console.log(data);

  databinding(data.articles);
}

function databinding(articles) {
  const cardcontainer = document.getElementById("card-container");
  const template = document.getElementById("template-news-card");

  cardcontainer.innerHTML = "";
  articles.forEach((article) => {
    //if (article.urlToImage == null) return;

    const card_clone = template.content.cloneNode(true);
    fetchdata(card_clone, article);
    cardcontainer.appendChild(card_clone);
  });
}
function fetchdata(card_clone, article) {
  const img = card_clone.querySelector("#img-val");
  img.src = article.urlToImage;
  const newstitle = card_clone.querySelector("#news-title");
  newstitle.innerHTML = article.title;

  const news_source = card_clone.querySelector("#news-source");
  const news_des = card_clone.querySelector("#news-desc");
  news_des.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  news_source.innerHTML = `${article.source.name}.${date}`;

  card_clone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

const s_button = document.getElementById("sbutton");
const searchbox = document.getElementById("searchbar");
//console.log(searchbox);

s_button.addEventListener("click", () => {
  const search_val = searchbox.value;
  if (search_val == null) return;
  fetchNews(search_val);
});

function go_home_page() {
  window.location = "/";
}

function nav_click(id) {
  fetchNews(id);
}

const top_button = document.getElementById("topbutton");

window.onscroll = function () {
  scrollfun();
};

function scrollfun() {
  console.log("calme");
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10)
    top_button.style.display = "block";
  else top_button.style.display = "none";
}

function toppage() {
  document.documentElement.scrollTop = 0;
}
