console.log("helllo");

const url =
  "https://real-time-news-data.p.rapidapi.com/search?&country=IN&query=";
const options = {
  headers: {
    "X-RapidAPI-Key": "b08e26b710mshe1a85a7ddd4d99fp1688fbjsn31be08e83aec",
  },
};
window.addEventListener("load", () => fetchNews("IN"));

async function fetchNews(query) {
  const res = await fetch(`${url}${query}`, options);
  const result = await res.json();
  //console.log(result);

  datawrap(result.data);
}

function datawrap(data) {
  const cardcontainer = document.getElementById("card-container");
  const template = document.getElementById("template-news-card");

  cardcontainer.innerHTML = "";

  data.forEach((element) => {
    if (element.photo_url == null) return;

    const card_clone = template.content.cloneNode(true);
    fetchdata(card_clone, element);
    cardcontainer.appendChild(card_clone);
  });
}

function fetchdata(card_clone, article) {
  const img = card_clone.querySelector("#img-val");
  img.src = article.photo_url;
  const newstitle = card_clone.querySelector("#news-title");
  newstitle.innerHTML = article.title;

  const news_source = card_clone.querySelector("#news-source");

  // const news_des = card_clone.querySelector("#news-desc");
  // news_des.innerHTML = article.description;

  const date = new Date(article.published_datetime_utc).toLocaleString(
    "en-US",
    {
      timeZone: "Asia/Jakarta",
    }
  );

  //news_source.innerHTML = `${article.source_url}.  ${date}`;

  news_source.innerHTML = `${date}`;
  try {
    const news_img = card_clone.querySelector("#news-image");
    news_img.src = article.source_favicon_url;
  } catch {
    news_img.src = "na";
  }
  const media_name = card_clone.querySelector("#media-name");
  media_name.innerHTML = url_extract(media_name, article);

  card_clone.firstElementChild.addEventListener("click", () => {
    window.open(article.link, "_blank");
  });
}
function url_extract(media_name, article) {
  media_name = article.source_url;
  //console.log(media_name);
  const url_head = new URL(media_name);
  const domaininpart = url_head.hostname;
  const domain = domaininpart.split(".");
  //console.log(domain);
  const val = domain.length > 2 ? domain[1] : domain[0];
  return val;
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
