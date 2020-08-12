# weather-dashboard-redone
I wanted to rework an old project with a new idea or two added.

## Description
This is a front end weather app. It uses **HTML5**, **CSS3**, **JavaScript**, and the **Openweathermap API**.

## Viewablility
You can find it at https://misterjosh.github.io/Homework-06-WeatherApp/index.html in my Github Repository.

## Changes from the original
1. The first change I made was to remove as much error from the user as I could. I did this through validation on the city input, hard coding USA for the country, and adding a dropdown with all 50 states in it. This stopped errors like Canton producing results for Canton China or the return being in Arabic.

2. Next, the original was on a rushed deadline during a fast and steep learning curve. I didn't have a chance to make some slight, but needed changes. The first is in the way the five day forecast was displayed. My original layout had 4 cards in one row while the last card would always be spilled into the next row on a large display. That has been addressed. The aside section on medium would force everything not in the aside to appear below it. I wanted that only for a small view. Now it is.

3. Last, I originally didn't have any set up to remove the history without forcing somebody to find and empty their local storage. I have made a button and the functionality to do that now.

### Minor Technicality
My motivation on this was to show a working copy with a link to the exact code and commits. This is and isn't completely that. This is my code and it is running what you see in the link. It isn't for the repository you are reading this from. Github is complicated, to put it simply. I reworked the whole thing only to discover that Github wouldn't let me link a running version from the new repository it is in. So, I copied my new code to the old folder to make it work. I didn't want you to think I was trying to trick you, if you took the time to look that deep.

Thanks for understatnding,

Joshua Brooks