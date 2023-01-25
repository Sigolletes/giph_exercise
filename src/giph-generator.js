const giphGenerator = (function() {
  const $main = document.querySelector("#main");
  const $search = document.querySelector("#search");

  const api_key = 'GEuWWpT4pvXl1MSecs0yVBsmefvFfWdl';

  async function trending() {
    const giphURL = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}`;
    const response = await fetch(giphURL, {mode: 'cors'});
    const giphData = await response.json();

    $main.innerHTML = "";
    $main.classList.remove("flex");
    $main.classList.add("grid");
    for (let i = 0; i < 4; i++) {
      let $img = document.createElement('img');
      $main.appendChild($img);
      $img.src = giphData.data[i].images.original.url;
    }
  }

  async function searchGiph() {
    const giphURL = `https://api.giphy.com/v1/gifs/translate?api_key=${api_key}&s=${$search.value}`;
    const response = await fetch(giphURL, {mode: 'cors'});
    const giphData = await response.json();
    console.log(giphData);

    $main.innerHTML = "";
    $main.classList.remove("grid");
    $main.classList.add("flex");
    let $img = document.createElement('img');
    $main.appendChild($img);
    $img.src = giphData.data.images.original.url;
  }

  $search.addEventListener('input', (e) => {
    e.preventDefault();
    if ($search.value) {
      searchGiph();
    } else {
      trending();
    }
  });

  return {
    trending
  }
})();

export default giphGenerator;