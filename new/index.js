const button = document.querySelector(".btn");
const country = document.querySelector(".content");
const renderCountry = function (data) {
  const html = `

  <article class="message">
     <img class='photo' src="${data.flags.png}" />
     <div class='country_data'>
        <h3 class="country_name">${data.name.common}</h3>
        <h5 class="country_continent">${data.continents}</h5>
        <p class="row"><span>👩🏼‍🤝‍👨🏻</span>${(data.population / 1000000).toFixed(
          0
        )} million</p>
        <p class="row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
        <p class="row"><span>💰</span>${
          Object.values(data.currencies)[0].name
        }</p>

      </div>
   </article>`;
  document.querySelector(".content").insertAdjacentHTML("beforeend", html);
};

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  //geo location
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;

  //reverse geocoding
  const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  const dataGeo = await resGeo.json();
  console.log(dataGeo);
  //country data
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${dataGeo.country}`
  );
  const [data] = await res.json();
  renderCountry(data);
  console.log(data);
};

whereAmI();
