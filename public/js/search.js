let allDataMap;
let allDataStateMap;
function selectMap() {
  fetch("/countriesMap").then(res => res.json()).then(data => {
    // console.log(data);
	allDataMap = data;
    let tem = document.getElementById("countryMap");
	for (let i = 0; i < data.length; i++) {	
      const newOption = document.createElement("option");
      newOption.text = data[i].name;
      newOption.value = data[i].name;
      tem.appendChild(newOption);
    }
  });
}
selectMap();
document.getElementById("countryMap").addEventListener("change", findStatesMap);
function findStatesMap() {  
  let country = document.getElementById("countryMap").value;
  // console.log(country);
  // console.log(allData);
  
  let countryCode;
  for (let i = 0; i < allDataMap.length; i++){
    if (allDataMap[i].name == country) {
      countryCode = allDataMap[i].isoCode;
      // console.log(countryCode);
      break;
    }
  }
  // console.log(countryCode);
  let data = { "value": countryCode };
  fetch('/stateMap', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
		.then(data => {
			let tem = document.getElementById("stateMap");
			while(true){
				if (tem.length > 0) {
					tem.remove(tem.length - 1);
				}
				else break;
			}
      for (let i = 0; i < data.length; i++) {
        const newOption = document.createElement("option");
        newOption.text = data[i].name;
        newOption.value = data[i].name;
        tem.appendChild(newOption);
      }
      allDataStateMap = data;
    // console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
document.getElementById("stateMap").addEventListener("change", findCitiesMap);
function findCitiesMap(){
  let state = document.getElementById("stateMap").value;
  // console.log(state);
  // console.log(allData);
  let stateCode;
  for (let i = 0; i < allDataStateMap.length; i++){
    if (allDataStateMap[i].name == state) {
      stateCode = allDataStateMap[i].isoCode;
      // console.log(stateCode);
      break;
    }
  }
  let data = { "value": stateCode };
  fetch('/citiesMap', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
    .then(data => {
			let tem = document.getElementById("cityMap");
			while(true){
				if (tem.length > 0) {
					tem.remove(tem.length - 1);
				}
				else break;
			}
      for (let i = 0; i < data.length; i++) {
        const newOption = document.createElement("option");
        newOption.text = data[i].name;
        newOption.value = data[i].name;
        tem.appendChild(newOption);
      }
    // console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
