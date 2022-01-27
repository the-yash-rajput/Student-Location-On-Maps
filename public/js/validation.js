
src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"

// src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCfCZT318efZQvnaXaKg-rGjP1CmeCCh2c&libraries=places"


function ValidateEmail() 
{
  var s = document.getElementById("email").value;
  console.log(s);

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(s))
  {
    return (true)
  }
  alert("You have entered an invalid email address!")
  return (false)
}


console.log("ji");


function select() {
  console.log(1);
  // $(document).ready(function () {
  //   var autocomplete = new google.maps.places.Autocomplete((document.getElementById('location')), {
  //     types: ['geacode']
      
  //   });
  //   google.maps.event.addListener(autocomplete, 'place_changed', function (){
  //     var near_place = autocomplete.getPlace();
  //   });

  // });
  // $(document).ready(function () {
  //   console.log(2)
  //   $.ajax({
  //     type: 'get',
  //     url: "https://www.universal-tutorial.com/api/getaccesstoken",
  //     success: function(data) {
  //       console.log("success")
  //     },
  //     error: function(error) {
  //       console.log("error")
  //     },
  //     header:{
  //       "Accept": "application/json",
  //       "api-token": "YrZ95232OHRNqBP8wSqwnbNw25y3FW09I0IRm_cwo3yygui8P50IB_4QCzFDQBwqdFQ",
  //       "user-email": "yashrajputishu@gmail.com"
  //     }
  //   })
  //   console.log(3)
  // });
  
  console.log(4)
}
select();