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

//function for country data

const getCountryData = function (country) {
  //
  //
  // country -1

  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then(([data]) => {
      renderCountry(data);

      //country-2

      const second = data.borders[0];

      if (!second) return;

      return fetch(`https://restcountries.com/v3.1/alpha/${second}`);
    })
    .then((response) => response.json())
    .then(([data1]) => renderCountry(data1))
    .catch((err) => {
      //only show the api erro problem
      renderError(`Something went wrong 🎆🎆 ${err.message}. Try again!`);
    })
    .finally(() => {
      //the finally method will show the erro problem of entire method
      document.querySelector(".content").style.opacity = 1;
    });
};

button.addEventListener("click", function () {
  getCountryData("bharat");
  button.style.opacity = 0;
});
