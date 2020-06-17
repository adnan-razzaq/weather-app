//DOM ELEMENTS
const timezone = document.querySelector(".location h1");
const icon = document.querySelector(".location p");
const temperature = document.querySelector(".temp-degree");
const tempdescription = document.querySelector(".temperature-desc");
const tempunit = document.querySelector("span");
const tempsection = document.querySelector(".temp-section");
const info = document.querySelector(".info");

// get your loaction
window.addEventListener("load", () => {
  let lat;
  let long;
  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    long = position.coords.longitude;

    const url = `http://api.weatherstack.com/current?access_key=3998b9723b3b97c6ec33ed524321d887&query=${lat},${long}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        const {
          location: { country },
          current: {
            temperature,
            weather_icons,
            weather_descriptions,
            wind_speed,
            wind_degree,
            wind_dir,
            pressure,
            humidity,
            feelslike,
            is_day,
          },
        } = data;

        timezone.textContent = country;
        icon.innerHTML = `<img src=${weather_icons[0]}></img>`;
        temperature.textContent = temperature;
        tempdescription.textContent = weather_descriptions;
        const div = document.createElement("div");
        div.innerHTML = `<p>
          <small>wind_speed:${wind_speed}</small>
          <i class="fas fa-wind"></i>
        </p>
        <p>
          <small>wind_degree:${wind_degree}</small>
          <i class="fas fa-bolt"></i>
        </p>
        <p>
          <small>wind_dir:${wind_dir}</small>
          <i class="fas fa-compass"></i>
        </p>
        <p>
          <small>wind_pressure:${pressure}</small>
          <i class="fas fa-smog"></i>
        </p>
        <p>
          <small>wind_humidity:${humidity}</small>
          <i class="fas fa-feather-alt"></i>
        </p>
        <p>
          <small>feelislike${feelslike}</small>
          <i class="fas fa-snowflake"></i>
        </p>
        <p>
          <small>is_day:${is_day}</small>
          <i class="fas fa-moon"></i>
        </p>`;
        info.appendChild(div);
      });
  });
  //event listener
  tempsection.addEventListener("click", () => {
    if (tempunit.innerText === "℃") {
      tempunit.innerText = "℉";
    } else if (tempunit.innerText === "℉") {
      tempunit.innerText = "℃";
    }
  });
});
