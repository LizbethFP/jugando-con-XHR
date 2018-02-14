const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;

form.addEventListener('submit', function(e) {
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;
  getNews();
});

function getNews() {
  const articleRequest = new XMLHttpRequest();
  articleRequest.open('GET',  `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=9b5148ce631e41889c9dea060f993ba3`);
  articleRequest.onload = addNews;
  articleRequest.onerror = handlerError;
  articleRequest.send();
}

function handlerError() {
  console.log('Se ha presentado un error');
}

function addNews() {
  const data = JSON.parse(this.responseText);
  // console.log(data);
  // const response = data.response;
  // console.log(response);
  // console.log(this.response);
  const articles = data.response.docs;

  articles.forEach(function(article) {
    const title = article.headline.main;
    const snippet = article.snippet;
    const webUrl = article.web_url;
    const img = `https://www.nytimes.com/${article.multimedia[0].url}`;

    let li = document.createElement('li');
    li.className = 'articleClass';
    let content = `<h2><a href='${webUrl}' target='_blank' class='text-info'>${title}<a/></h2><img src="${img}"><p>${snippet}</p>`;
    li.innerHTML = content;

    responseContainer.appendChild(li);
  });
}
