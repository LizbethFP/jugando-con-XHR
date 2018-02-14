const btnFetch = document.getElementById('search-form-fetch');
const searchFieldFetch = document.getElementById('search-keyword-fetch');
const responseContainerFetch = document.getElementById('response-container-fetch');
let searchedForTextFetch;
const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForTextFetch}&api-key=9b5148ce631e41889c9dea060f993ba3`;

btnFetch.addEventListener('submit', function(event) {
  event.preventDefault();
  responseContainerFetch.innerHTML = '';
  searchedForTextFetch = searchFieldFetch.value;
  fetch(url)
    .then(function(response) {
      console.log(response);
      return response.json();
    }).then(function(data) {
      console.log(data.response);
      // console.log(data.response.docs[0]);
      const articleFetchs = data.response.docs;

      articleFetchs.forEach(function(articleFetch) {
        const titleFetch = articleFetch.headline.main;
        const snippetFetch = articleFetch.snippet;
        const webUrlFetch = articleFetch.web_url;
        const imgFetch = `https://www.nytimes.com/${articleFetch.multimedia[0].url}`;

        let liFetch = document.createElement('li');
        liFetch.className = 'articleClass';
        let contentFetch = `<h2><a href='${webUrlFetch}' target='_blank'>${titleFetch}<a/></h2><img src="${imgFetch}"><p>${snippetFetch}</p>`;
        liFetch.innerHTML = contentFetch;
        responseContainerFetch.appendChild(liFetch);
      });
    })
    .catch(function() {
      console.log('Se ha presentado un error');
    });
});
