const giphGenerator = (function() {
  const $main = document.querySelector("#main");

  const baseURL = 'https://api.giphy.com/v1/gifs/';
  const api_key = 'GEuWWpT4pvXl1MSecs0yVBsmefvFfWdl';

  async function randomRequest() {
    const randomURL = `${baseURL}random?api_key=${api_key}`
    const response = await fetch(randomURL, {mode: 'cors'});
    const randomData = await response.json();
    console.log(randomData.data.images.original.url);
    return randomData.data.images.original.url;
  }

  const random = () => {
    for (let i = 1; i <= 2; i++) {
      let $img = document.createElement("img");
/*       $img.src = randomRequest().then(); */
      console.log($img.src, randomRequest());
      $main.appendChild($img);
    }
  }

  return {
    random
  }
})();

export default giphGenerator;