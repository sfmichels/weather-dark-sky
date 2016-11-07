// San Francisco
// {"_id":5391959,"name":"San Francisco","country":"US","coord":{"lon":-122.419418,"lat":37.774929}}
// Dark Sky API Key
var lon;
var lat;
var tempUnit = "F";
var fahrenheit;
var celsius;
var neighborhood;
var city;
var state;
var country;
var description;
var weatherIcon;
var skycons;

var WEATHER_APPID = "25c37737449f9aeb70674c2311ee93d6";
var GEOCODE_APPID = "AIzaSyB-mIwhxvmaq7_k_chW2lGC7mNQQkybAKA";

$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      getWeather(lat, lon);
      getLocationNames(lat, lon);
    });
  } else {
    alert("Weather is not available");
    console.log("Geo not in navigator");
  }

  function getWeather(lat, lon) {
    var api = 'https://crossorigin.me/https://api.forecast.io/forecast/' + WEATHER_APPID + '/' + lat + ',' + lon + '?units=us';
    // console.log('API string: ' + api);
    $.getJSON(api, function(weatherData) {
      // console.log("JSON results: " + JSON.stringify(weatherData));
      cacheWeatherData(weatherData);
      displayWeather(weatherData);
    });
  }

  function cacheWeatherData(weatherData) {
    tempUnit = "F";
    fahrenheit = Math.floor(weatherData.currently.temperature + 0.5);
    celsius = Math.floor((fahrenheit - 32) * 5 / 9);
    description = weatherData.currently.summary;
    // console.log(description);

    var icon = weatherData.currently.icon;
    getSkycons(icon);
    skycons.play();
  }

  function getSkycons(iconName) {
    switch (iconName) {
      case "clear-day":
        skycons = new Skycons({"color": "#ffff33"});
        skycons.add("icon1", Skycons.CLEAR_DAY);
        break;
      case "clear-night":
        skycons = new Skycons({"color": "#bdb76b"});
        skycons.add("icon1", Skycons.CLEAR_NIGHT);
        break;
      case "partly-cloudy-day":
        skycons = new Skycons({"color": "#606060"});
        skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
        break;
      case "partly-cloudy-night":
        skycons = new Skycons({"color": "#606060"});
        skycons.add("icon1", Skycons.PARTLY_CLOUDY_NIGHT);
        break;
      case "cloudy":
        skycons = new Skycons({"color": "#606060"});
        skycons.add("icon1", Skycons.CLOUDY);
        break;
      case "rain":
        skycons = new Skycons({"color": "#a6b2cb"});
        skycons.add("icon1", Skycons.RAIN);
        break;
      case "sleet":
        skycons = new Skycons({"color": "#a6b2cb"});
        skycons.add("icon1", Skycons.SLEET);
        break;
      case "snow":
        skycons = new Skycons({"color": "#a6b2cb"});
        skycons.add("icon1", Skycons.SNOW);
        break;
      case "wind":
        skycons = new Skycons({"color": "#a6b2cb"});
        skycons.add("icon1", Skycons.WIND);
        break;
      case "fog":
        skycons = new Skycons({"color": "#525252"});
        skycons.add("icon1", Skycons.FOG);
        break;
      default:
        skycons = new Skycons({"color": "#606060"});
        skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
        break;
    }
  }

  function displayWeather(weatherData) {
    $('#temp').html(Math.floor(fahrenheit + 0.5));
    // console.log("Temp check: " + Math.floor(weatherData.currently.temperature + 0.5));
    $('#description').html(description);
    $('#weatherIcon').addClass(weatherIcon);
  }

  function cacheLocationData(locationData) {
    neighborhood = locationData[0].address_components[2].long_name;
    city = locationData[0].address_components[3].long_name;
    // console.log("City: " + city);
    state = locationData[0].address_components[5].short_name;
    country = locationData[0].address_components[6].short_name;
  }

  function displayLocationData(locationData) {
    $('#neighborhood').html(neighborhood);
    $('#city').html(city);
    $('#state').html(state);
    $('#country').html(country);
  }

  function getLocationNames(lat, lon) {
    // console.log('lat lon: ' + lat + ' ' + lon);
    var geocoder = new google.maps.Geocoder();
    var location = new google.maps.LatLng(lat, lon);
    geocoder.geocode({
      'latLng': location
    }, function(locationData, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        cacheLocationData(locationData);
        displayLocationData(locationData);
      }
    });
  }

  // Toggle fahrenheit/celsius
  $("#degree").click(function() {
    console.log("Updating HTML");
    console.log("Temp values: F: " + fahrenheit + "  C: " + celsius);
    if ($("#degree").html() === "F") {
      $('#temp').html(celsius);
      $("#degree").html("C");
    } else {
      $('#temp').html(fahrenheit);
      $("#degree").html("F");
    }
  });
});