// prevent submit button from refreshing the page
$(document).ready(() => {

    // get values from user when button is clicked
    $("#search-button").on("click", () => {
        // get the city value from text input
        var cityVal = $("#cityVal").val();
        // make sure we are getting it
        console.log(cityVal + " line 9");
        // get the state value from dropdown
        var stateVal = $("#stateVal").val();
        // make sure we are getting it
        console.log(stateVal + " line 12");


        
    });
});