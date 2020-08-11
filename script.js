// makes the document load before providing JavaScript functionality
$(document).ready(() => {

    // get values from user when search button is clicked
    $("#search-button").on("click", () => {
        // get the city value from text input
        const cityVal = $("#cityVal").val();
        // get the state value from dropdown
        const stateVal = $("#stateVal").val();
        // commbine that info as needed for the API
        // USA hard coded to prevent erroneus responses
        const searchValue = `${cityVal}` + "," + `${stateVal}` + ",USA";
        // clear the city input box - state will always have a value
        $("#cityVal").val("");
        // call searchWeather and pass in city and state values
        searchWeather(searchValue);
    });

    // clear history button functionality
    $("#clear-history").on("click", () => {
      // if "history" is in local storage
      if (localStorage.getItem("history")) {
        // remove it
        localStorage.removeItem("history");
        // clear the history ul on the page
        $(".history").val("");
        // reload the page
        location.reload();
      // if not
      } else {
        // do nothing and stop
        return
      }
    });

    // if we have past history items, clicking on it will use the past info
    $(".history").on("click", "li", function() {
        searchWeather($(this).text());
      });

    // makes a row and appends it to the ul for history as a li
    function makeRow(text) {
        var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
        $(".history").append(li);
      }

    // if there is history get it, if not set it to an empty array
    const history = JSON.parse(window.localStorage.getItem("history")) || [];
    // if the array is not empty call make row for every item in the history array
    if(history !== []) {
      for(i = 0; i < history.length; i++) {
        makeRow(history[i]);
      }
    }

    // make an api call passing in city and state values
    function searchWeather(searchValue) {
        $.ajax({
          type: "GET",
          url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=e1c35146e4a2edbeb98aaad7633513f6&units=imperial",
          dataType: "json",
          success: (data) => {

            // look for the searchValue in local storage. it returns a -1 if it isn't found.
            // if not found it pushes the value into localStorage and make a row for it
            if (history.indexOf(searchValue) === -1) {
              history.push(searchValue);
              window.localStorage.setItem("history", JSON.stringify(history));
        
              makeRow(searchValue);
            }

            // else
            // clear any old content, make a current weather card, get the five day forecast, and get the uv index
            $("#today").empty();
    
            // current weather content
            const title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
            const card = $("<div>").addClass("card");
            const wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
            const humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
            const temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
            const cardBody = $("<div>").addClass("card-body");
            const img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    
            // current weather card design
            title.append(img);
            cardBody.append(title, temp, humid, wind);
            card.append(cardBody);
            $("#today").append(card);
    
            // get lat and lon ready for getUVIndex()
            lat = data.coord.lat;
            lon = data.coord.lon;

            // get the five day forecast and uv index
            getForecast(searchValue);
            getUVIndex(searchValue);
          }
        }); 
      }

    // feed searchValue back in for a five day forecast
    function getForecast(searchValue) {
      $.ajax({
        type: "GET",
        url:"https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=e1c35146e4a2edbeb98aaad7633513f6&units=imperial",
        dataType: "json",
        success: (fiveDay) => {
          // if there is a five day forecast clear it for the new one
          $("#forecast").empty();
          // create title for the forecast
          $("#forecast").html("<h4>" + fiveDay.city.name +"'s Five Day Forecast</h4>");
          // append new row to hold new cards
          $("#forecast").append("<div class='row'></div>");
          
          // go through all of the forecast objects
          for(i = 0; i < fiveDay.list.length; i++){
            // if one has a time of 12:00:00 make a new card
            if(fiveDay.list[i].dt_txt.indexOf("12:00:00") !== -1) {
 
              // new card content
              const title = $("<h5>").addClass("card-title").text(fiveDay.city.name + " (" + new Date(fiveDay.list[i].dt_txt).toLocaleDateString() + ")");
              const card = $("<div>").addClass("card col-sm-12 col-md-5 col-lg-2 mr-3");
              const wind = $("<p>").addClass("card-text").text("Wind Speed: " + fiveDay.list[i].wind.speed + " MPH");
              const humid = $("<p>").addClass("card-text").text("Humidity: " + fiveDay.list[i].main.humidity + "%");
              const temp = $("<p>").addClass("card-text").text("Temperature: " + fiveDay.list[i].main.temp + " °F");
              const cardBody = $("<div>").addClass("card-body");
              const img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + fiveDay.list[i].weather[0].icon + ".png");
    
              // new card design
              title.append(img);
              cardBody.append(title, temp, humid, wind);
              card.append(cardBody);
              $("#forecast .row").append(card);
            }
          }
        }
      })
    }

    // uv index
    // lat and lon are empty values until searchWeather() provides the vaules from its return
    let lat = "";
    let lon = "";

    function getUVIndex() {
      $.ajax({
        type: "GET",
        url:"https://api.openweathermap.org/data/2.5/uvi?appid=e1c35146e4a2edbeb98aaad7633513f6&lat=" + lat + "&lon=" + lon,
        dataType: "json",
        success: (currentUV) => {

          // make a paragraph about the uv value and assign a color below
          const dispUV = $("<p>").addClass("card-text").text("UV Index: " + currentUV.value);
          // colors based on the scale associated with uv index on wikipedia.com
            if(parseInt(currentUV.value) > 0 && parseInt(currentUV.value) <= 3){
              dispUV.css("background-color", "green");
            }
            if(parseInt(currentUV.value) > 3 && parseInt(currentUV.value) <= 6){
              dispUV.css("background-color", "yellow");
            }
            if(parseInt(currentUV.value) > 6 && parseInt(currentUV.value) <= 8){
              dispUV.css("background-color", "orange");
            }
            if(parseInt(currentUV.value) > 8){
              dispUV.css("background-color", "red");
            }

          // add UV index to the current weather card
          $("#today .card-body").append(dispUV);
          
        }
      })
    }

});