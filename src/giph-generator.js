const giphGenerator = (function() {
  const $main = document.querySelector("#main");

  const api_key = 'GEuWWpT4pvXl1MSecs0yVBsmefvFfWdl';

  async function trending() {
    const giphURL = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}`;
    const response = await fetch(giphURL, {mode: 'cors'});
    const giphData = await response.json();
    console.log(giphData);

    for (let i = 0; i < 4; i++) {
      let $img = document.createElement('img');
      $main.appendChild($img);
      $img.src = giphData.data[i].images.original.url;
    }
  }

  

  return {
    trending
  }
})();

export default giphGenerator;