
$(document).ready(function () {
  $("#searchOnMap").click(function () {
    let country = document.getElementById("countryMap").value;
    let state = document.getElementById("stateMap").value;
    let city = document.getElementById("cityMap").value;
    let data = {
        "country": country,
        "state": state,
        "city":city
    };
    // console.log(data);
    fetch('/MapLocations', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
      .then(data => {
        const mapdiv = document.getElementById("mapdiv");
        mapdiv.removeChild(document.getElementById("map"));
        const innerMapDiv = document.createElement("div");
        innerMapDiv.setAttribute('id', 'map');
        mapdiv.appendChild(innerMapDiv);
        
        let allDataOfLocation = data;
        if (allDataOfLocation.count == 0) {
          alert("No Data Fount");
        }
        console.log('Success:', data);
        var map = L.map('map').setView([allDataOfLocation.latitude,allDataOfLocation.longitude], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFub2pzaXJ2aSIsImEiOiJja3l2a2JiZ2MwaHJyMm90NG40b2tlbXVzIn0.bG-TiWrcFfw97Gg6jJcVHQ', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFub2pzaXJ2aSIsImEiOiJja3l2a2JiZ2MwaHJyMm90NG40b2tlbXVzIn0.bG-TiWrcFfw97Gg6jJcVHQ'
}).addTo(map)

L.marker([allDataOfLocation.latitude,allDataOfLocation.longitude]).addTo(map)
    .bindPopup(allDataOfLocation.finalData)
    .openPopup();
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  });
});


