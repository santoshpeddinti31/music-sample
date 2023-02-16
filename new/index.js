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

// Error for status of api

const renderError = function (msg) {
  country.insertAdjacentText("beforeend", msg);
};

//antoher functio

const getJson = function (url, errorMsg) {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

//function for country data

const getCountryData = function (country) {
  //
  //
  // country -1

  getJson(`https://restcountries.com/v3.1/name/${country}`, "Country not found")
    .then(([data]) => {
      renderCountry(data);
      console.log(data);
      //country-2

      const second = data.borders[0];

      if (!second) return;

      return getJson(
        `https://restcountries.com/v3.1/alpha/${second}`,
        " country Not Found"
      );
    })
    .then(([data1]) => renderCountry(data1))
    .catch((err) => {
      console.error(`${err}🎆🎆🎆`);
      //only show the api erro problem
      renderError(`Something went wrong🎆🎆🎆 ${err.message}. Try again!`);
    })
    .finally(() => {
      //the finally method will show the erro problem of entire method
      document.querySelector(".content").style.opacity = 1;
    });
};

button.addEventListener("click", function () {
  getCountryData("usa");
  button.style.opacity = 0;
});
getCountryData("usaa");
