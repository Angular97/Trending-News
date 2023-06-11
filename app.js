console.log("Bing API ");

const url = "https://bing-news-search1.p.rapidapi.com/news/search?&q=";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7fc8ffdacbmsh05e5c77d1273bdfp143a05jsnc1fb2c1a237a",
  },
};

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
  const res = await fetch(`${url}${query}`, options);
  const result = await res.json();
  console.log(result);
  datawrap(result.value);
}

function datawrap(data) {
  const cardcontainer = document.getElementById("card-container");
  const template = document.getElementById("template-news-card");

  cardcontainer.innerHTML = "";

  data.forEach((element) => {
    // if (element.image.thumbnail.contentUrl == null) return;
    //console.log(element.image);
    const card_clone = template.content.cloneNode(true);
    fetchdata(card_clone, element);
    cardcontainer.appendChild(card_clone);
  });
}

function fetchdata(card_clone, article) {
  const img = card_clone.querySelector("#img-val");
  try {
    img.src = article.image.thumbnail.contentUrl;
  } catch {
    img.src = "NA";
  }
  const newstitle = card_clone.querySelector("#news-title");
  newstitle.innerHTML = article.name;

  const news_source = card_clone.querySelector("#news-source");
  const news_des = card_clone.querySelector("#news-desc");
  news_des.innerHTML = article.description;

  const date = new Date(article.datePublished).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  news_source.innerHTML = `${date}`;

  const news_img = card_clone.querySelector("#news-image");
  try {
    news_img.src = article.provider[0].image.thumbnail.contentUrl;
  } catch {
    news_img.src = "NA";
  }

  const media_name = card_clone.querySelector("#media-name");
  media_name.innerHTML = article.provider[0].name;

  card_clone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

const s_button = document.getElementById("sbutton");
const searchbox = document.getElementById("searchbar");

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
