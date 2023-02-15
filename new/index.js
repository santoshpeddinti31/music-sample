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

function getCountry(country) {
  const request = new XMLHttpRequest();

  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);

  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    renderCountry(data);
    console.log(data);

    const [second] = data.borders;

    if (!second) return;

    //ajax call country -2

    const request2 = new XMLHttpRequest();
    request2.open("GET", `https://restcountries.com/v3.1/alpha/${second}`);
    request2.send();

    request2.addEventListener("load", function () {
      const [data1] = JSON.parse(this.responseText);
      console.log(data1);

      renderCountry(data1);
    });
  });
}
getCountry("norway");
