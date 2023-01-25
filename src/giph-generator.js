const giphGenerator = (function() {
  const $main = document.querySelector('#main');
  const $search = document.querySelector('#search');
  const $trending = document.querySelector('#trending');
  const $random = document.querySelector('#random');

  const api_key = 'GEuWWpT4pvXl1MSecs0yVBsmefvFfWdl';

  async function trending() {
    const giphURL = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}`;
    const response = await fetch(giphURL, {mode: 'cors'});
    const giphData = await response.json();

    $main.innerHTML = '';
    $main.classList.remove('flex');
    $main.classList.add('grid');
    for (let i = 0; i < 4; i++) {
      let $img = document.createElement('img');
      $main.appendChild($img);
      $img.src = giphData.data[i].images.original.url;
    }
  }

  async function random() {
    const giphURL = `https://api.giphy.com/v1/gifs/random?api_key=${api_key}`;
    const response = await fetch(giphURL, {mode: 'cors'});
    const giphData = await response.json();
    return giphData;
  }

  $random.addEventListener('click', () => {
    $main.innerHTML = '';
    $main.classList.remove('flex');
    $main.classList.add('grid');
    for (let i = 0; i < 4; i++) {
      let $img = document.createElement('img');
      $main.appendChild($img);
      random().then((giphData) => {
        $img.src = giphData.data.images.original.url;
      })
    }
  });

  $trending.addEventListener('click', trending());

  async function searchGiph() {
    try {
      const giphURL = `https://api.giphy.com/v1/gifs/translate?api_key=${api_key}&s=${$search.value}`;
      const response = await fetch(giphURL, {mode: 'cors'});
      const giphData = await response.json();
  
      $main.innerHTML = '';
      $main.classList.remove('grid');
      $main.classList.add('flex');
      let $img = document.createElement('img');
      $main.appendChild($img);
      $img.classList.add('bigImg');
      $img.src = giphData.data.images.original.url;
    } catch (error) {
      $main.innerHTML = '';
      $main.classList.remove('grid');
      $main.classList.add('flex');
      let $h1 = document.createElement('h1');
      $main.appendChild($h1);
      $h1.innerText = 'No giphs with this name';
      setTimeout(() => {
        $main.innerHTML = '';
        $search.value = '';
        trending();
      }, 5000);
    }
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