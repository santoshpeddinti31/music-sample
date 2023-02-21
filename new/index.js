const cardData = document.querySelector(".card");
const laharika = document.querySelector(".srinu");

const opacity = document.querySelector(".container");
const renderData = function (msg) {
  const html = `<article class="music">
  <img class="cover" src="${msg.tracks[0].album.images[0].url}" />
  <h2><span>Artist: </span>${msg.tracks[0].artists[0].name}</h2>
  <h5><span>Song: </span>${msg.tracks[0].name}</h5>
  <h6><span>Duration: </span>${(msg.tracks[0].duration_ms / 100000).toFixed(
    2
  )}sec</h6>

  <div class="santhu">
    <audio preload="metadata" controls  src="${
      msg.tracks[0].preview_url
    }"></audio>
  </div>
  
</article>`;

  cardData.insertAdjacentHTML("beforeend", html);

  opacity.style.opacity = 1;
};

const getMusic = function () {
  const req = new XMLHttpRequest();

  req.open(
    "GET",
    "https://spotify23.p.rapidapi.com/tracks/?ids=4WNcduiCmDNfmTEz7JvmLv"
  );
  req.setRequestHeader(
    "X-RapidAPI-Key",
    "c61f4f31ebmsh90cc43b2e524413p1c4e41jsn9b4eecabc048"
  );
  req.setRequestHeader("X-RapidAPI-Host", "spotify23.p.rapidapi.com");
  req.setRequestHeader("X-RapidAPI-Host", "spotify23.p.rapidapi.com");
  req.send();
  req.addEventListener("load", function () {
    const data = JSON.parse(this.responseText);
    console.log(data);
    renderData(data);
  });
};
getMusic();
