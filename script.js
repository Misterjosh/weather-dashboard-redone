// makes the document load before providing JavaScript functionality
$(document).ready(() => {

    // get values from user when button is clicked
    $("#search-button").on("click", () => {
        // get the city value from text input
        const cityVal = $("#cityVal").val();
        // make sure we are getting it
        // console.log(searchValue + " line 9");
        // get the state value from dropdown
        const stateVal = $("#stateVal").val();
        // make sure we are getting it
        // console.log(stateVal + " line 12");
        const searchValue = `${cityVal}` + "," + `${stateVal}` + ",USA";
        // clear the city input box - state will always have a value
        $("#cityVal").val("");
        // call searchWeather and pass in city and state values
        searchWeather(searchValue);
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
    // hard coded usa into the url to prevent erroneous responses
    function searchWeather(searchValue) {
        $.ajax({
          type: "GET",
          url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=e1c35146e4a2edbeb98aaad7633513f6&units=imperial",
          dataType: "json",
          success: (data) => {
            console.log(data);
            // create history link for this search
            if (history.indexOf(searchValue) === -1) {
              history.push(searchValue);
              window.localStorage.setItem("history", JSON.stringify(history));
        
              makeRow(searchValue);
            }
            
            // clear any old content
            $("#today").empty();
    
            // create html content for current weather
            const title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
            const card = $("<div>").addClass("card");
            const wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
            const humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
            const temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
            const cardBody = $("<div>").addClass("card-body");
            const img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    
            // merge and add to page
            title.append(img);
            cardBody.append(title, temp, humid, wind);
            card.append(cardBody);
            $("#today").append(card);
    
            // call follow-up api endpoints
            // lat = data.coord.lat;
            // lon = data.coord.lon;
            // console.log(lat, lon);
            // getForecast(searchValue);
            // getUVIndex(searchValue);
          }
        });
        
      }
});