
var ip = '8.8.8.8';
var apiKey = 'at_NkwCAYOK3TvhUmOBH8NvO5cS2jCnI';
var apiUrl = "https://geo.ipify.org/api/v2/country,city";
var bypass_cors_url = 'https://cors-anywhere.herokuapp.com/';


const headers_option = {
    headers: {
        'Access-Control-Allow-Origin':'*',
    }
}

// items to be updated

var display_ip = document.getElementById("ipAddress");
var display_location = document.getElementById("location");
var display_timeZone = document.getElementById("timeZone");
var display_isp = document.getElementById("isp");

// entered values

var inputIP = document.getElementById("inputIP");
var btn = document.getElementById("btnSave");

// creating map

var map = L.map('mapContainer', {
    'center': [0,0],
    'zoom': 1,
    'layers': [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          })
    ]
})


updateMarker=(default_marker=[20.5937,  78.9629])=>{
    map.setView(default_marker,4);
    L.marker(default_marker).addTo(map);
}

getIPdetails=(ipAddress)=>{

    if(ipAddress==undefined){

        var ip_url = `${apiUrl}?apiKey=${apiKey}`;
    }
    else{
        var ip_url = `${apiUrl}?apiKey=${apiKey}&ipAddress=${ipAddress}`;

    }

    fetch(ip_url)
    .then(result=>result.json())
    .then(data=>{
        console.log(data);
        display_ip.textContent = data.ip,

        display_location.innerHTML = `${data.location.city} ${data.location.region} ${data.location.country}`,

        display_timeZone.innerHTML = data.location.timezone,

        display_isp.innerHTML = data.isp

        updateMarker([data.location.lat, data.location.lng])
    })
    .catch(error =>{ 
        alert("Please enter valid IP address")
        console.log(error)
    })
}

// getIPdetails()

document.addEventListener('load', updateMarker());

btn.addEventListener('click',e=>{
    e.preventDefault();
    if (inputIP.value != '' && inputIP.value!=null) {
        getIPdetails(inputIP.value);
        return
    }
    else {
        alert("Please kaam karo")
    }
})
