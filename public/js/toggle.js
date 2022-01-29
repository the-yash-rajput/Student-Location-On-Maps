var obj = document.getElementById("mapdiv");
obj.style.visibility = 'hidden';
var obj2 = document.getElementById("myForm");
obj2.style.visibility = 'visible';
    
// hide map and show form.
$(document).ready(function () {
    $("#hideMap").click(function () {
        var obj = document.getElementById("mapdiv");
        obj.style.visibility = 'hidden';
        var obj2 = document.getElementById("myForm");
        obj2.style.visibility = 'visible';
    });
});

//hide form and show map.
$(document).ready(function () {
    $("#showMap").click(function () {
        var obj = document.getElementById("mapdiv");
        obj.style.visibility = 'visible';
        var obj2 = document.getElementById("myForm");
        obj2.style.visibility = 'hidden';
    });
});

// //hide form and show map.
$(document).ready(function () {
    $("#searchOnMap").click(function () {
        var obj = document.getElementById("mapdiv");
        obj.style.visibility = 'visible';
        var obj2 = document.getElementById("myForm");
        obj2.style.visibility = 'hidden';
    });
});

