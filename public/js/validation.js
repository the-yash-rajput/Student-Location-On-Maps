
src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"
function ValidateEmail() 
{
  var s = document.getElementById("email").value;
  // console.log(s);

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(s))
  {
    return (true)
  }
  alert("You have entered an invalid email address!")
  return (false)
}
let allData;
function select() {
  fetch("/countries").then(res => res.json()).then(data => {
    // console.log(data);
    allData = data;
    let tem = document.getElementById("country");
    for (let i = 0; i < data.length; i++) {
      const newOption = document.createElement("option");
      newOption.text = data[i].name;
      newOption.value = data[i].name;
      tem.appendChild(newOption);
    }
  });
  console.log(4)
}
select();

function findStates(){
  let country = document.getElementById("country").value;
  console.log(country);
  console.log(allData);
  let countryCode;
  for (let i = 0; i < allData.length; i++){
    if (allData[i].name == country) {
      countryCode = allData[i].isoCode;
      console.log(countryCode);

      break;
    }
  }
  console.log(countryCode);
  let data = { "value": countryCode };
  fetch('/state', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
    .then(data => {
      let tem = document.getElementById("state");
      for (let i = 0; i < data.length; i++) {
        const newOption = document.createElement("option");
        newOption.text = data[i].name;
        newOption.value = data[i].name;
        tem.appendChild(newOption);
      }
      allData = data;
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function findCities(){
  let state = document.getElementById("state").value;
  console.log(state);
  console.log(allData);
  let stateCode;
  for (let i = 0; i < allData.length; i++){
    if (allData[i].name == state) {
      stateCode = allData[i].isoCode;
      console.log(stateCode);
      break;
    }
  }
  let data = { "value": stateCode };
  fetch('/cities', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
    .then(data => {
      let tem = document.getElementById("city");
      for (let i = 0; i < data.length; i++) {
        const newOption = document.createElement("option");
        newOption.text = data[i].name;
        newOption.value = data[i].name;
        tem.appendChild(newOption);
      }
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}