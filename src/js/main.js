
$(document).ready(function() {
    // Hide the preloader when the page is fully loaded
    $(window).on('load', function() {
      $('#preloader').fadeOut('slow');
    });
  });

function renderHtml(id, page) {
    $.ajax({
        type: 'GET',
        url: '../pages/'+page+'.html',
        success: function (file_html) {
            $('#'+id).html(file_html);
        }
    });
  }

renderHtml('render-navbar', 'navbar')
renderHtml('render-footer','footer');


// set range waktu untuk menentukan jenis greeting
$(document).ready(function () {

  function isTimeInRange(startTime, endTime) { 
    const currentTime = new Date();

    const start = new Date();
    const end = new Date();

    //parse input in 24-hour format
    const [startHour, startMinute] = startTime.split(":");
    start.setHours(parseInt(startHour, 10));
    start.setMinutes(parseInt(startMinute, 10));

    const [endHour, endMinute] = endTime.split(":");
    end.setHours(parseInt(endHour, 10));
    end.setMinutes(parseInt(endMinute, 10));

    if (startTime >= endTime) {
      return currentTime >= start || currentTime <= end;
    } else {
      return currentTime >= start && currentTime <= end;
    }
   }

   if (isTimeInRange("05:00","11:59")) {
    var greeting = "Hello, Good Morning!";
   } else if (isTimeInRange("12:00", "16:59")) {
    var greeting = "Hello, Good Afternoon!";
   } else if (isTimeInRange("17:00", "04:59")) {
    var greeting = "Hello, Good Evening!";
   } else {
    var greeting = "Hello!";
   }

  $('#greet').text(greeting);
});

// Media Query
$(document).ready(function () {
    function toggleVisibility() {
        var windowWidth = $(window).width();
        var divId = $('#lottie-container');

        if (windowWidth <= 768) {
            divId.hide();
            $('#about').addClass('mb-5');
            $('#intro-tab').addClass('custom-nav-item');
            $('#exp-tab').addClass('custom-nav-item');
            $('#edu-tab').addClass('custom-nav-item');
            $('#all-tab').addClass('custom-nav-item');
            $('#design-tab').addClass('custom-nav-item');
            $('#webdev-tab').addClass('custom-nav-item');
        } else {
            divId.show();
        }
    }

    toggleVisibility();

    $(window).resize(function () { 
        toggleVisibility();
    });
});

// Back to top button
$(document).ready(function () {
    $(window).scroll(function () { 
        if ($(this).scrollTop() > 100) {
            $('#backToTopBtn').fadeIn();
        } else {
            $('#backToTopBtn').fadeOut();
        }
    });
    $('#backToTopBtn').click(function() {
        $('html, body').animate({scrollTop: 0}, 200); // Adjust the animation duration as needed
    });
});


// JS for Portofolios

// Proccess JSON
function encodeParams(params) { 
    return btoa(JSON.stringify(params));
}

function decodeParams(encodeParams) {
    return JSON.parse(atob(encodeParams));
}

var jsonDataUrl = '../src/data/portofolios.json';

// get json data all card category
$.getJSON(jsonDataUrl, function (data) {
    // console.log('JSON data loaded successfully:', data);
        $.each(data.portofolios, function (_, porto) { 
            var ParamsEncode = encodeParams({
                portoId : porto.portoId
            });
            if (porto.url === '#') {
                var cardAll = '<div class="col-md-6 d-flex justify-content-center">' +
                    '<div class="card card-bg-dark-blue rounded-4 text-center mb-3">' +
                      '<img src="'+ porto.img +'" class="card-img-top porto-img img-fluid" alt="porto1">'+
                      '<div class="card-body">'+
                        '<h5 class="card-title text-blue fw-bold">'+ porto.name +'</h5>'+
                        '<p class="card-text">'+ porto.title +'</p>'+
                        '<a href="'+ porto.url +'"  onClick="'+ porto.event +'" class="btn btn-second text-white"><i class="bx bx-link-alt"></i></a>'+
                        '<a href="porto-details.html?params=' + encodeURIComponent(ParamsEncode) + '" class="btn btn-blue text-white ms-2">Detail</a>'+
                      '</div>'+
                    '</div>'+
                  '</div>';
            } else {
                var cardAll = '<div class="col-md-6 d-flex justify-content-center">' +
                    '<div class="card card-bg-dark-blue rounded-4 text-center mb-3">' +
                      '<img src="'+ porto.img +'" class="card-img-top porto-img img-fluid" alt="porto1">'+
                      '<div class="card-body">'+
                        '<h5 class="card-title text-blue fw-bold">'+ porto.name +'</h5>'+
                        '<p class="card-text">'+ porto.title +'</p>'+
                        '<a href="'+ porto.url +'" target="_blank"  onClick="'+ porto.event +'" class="btn btn-second text-white"><i class="bx bx-link-alt"></i></a>'+
                        '<a href="porto-details.html?params=' + encodeURIComponent(ParamsEncode) + '" class="btn btn-blue text-white ms-2">Detail</a>'+
                      '</div>'+
                    '</div>'+
                  '</div>';
            }
            $('#card-all').append(cardAll);
        });
    }
);

// Filtered card category
function getFilteredPortoByCategory(category, outputId) { 
    $.getJSON(jsonDataUrl, function (data) {
            $.each(data.portofolios, function (_, porto) {
                 if (porto.category === category) {
                    var ParamsEncode = encodeParams({
                        portoId : porto.portoId
                    });
                    if (porto.url === '#') {
                        var cardFilterd = '<div class="col-md-6 d-flex justify-content-center">' +
                        '<div class="card card-bg-dark-blue rounded-4 text-center mb-3">' +
                          '<img src="'+ porto.img +'" class="card-img-top porto-img img-fluid" alt="porto1">'+
                          '<div class="card-body">'+
                            '<h5 class="card-title text-blue fw-bold">'+ porto.name +'</h5>'+
                            '<p class="card-text">'+ porto.title +'</p>'+
                            '<a href="'+ porto.url +'" onClick="'+ porto.event +'" class="btn btn-second text-white"><i class="bx bx-link-alt"></i></a>'+
                            '<a href="porto-details.html?params=' + encodeURIComponent(ParamsEncode) + '" class="btn btn-blue text-white ms-2">Detail</a>'+
                          '</div>'+
                        '</div>'+
                      '</div>';                        
                    } else {
                        var cardFilterd = '<div class="col-md-6 d-flex justify-content-center">' +
                        '<div class="card card-bg-dark-blue rounded-4 text-center mb-3">' +
                          '<img src="'+ porto.img +'" class="card-img-top porto-img img-fluid" alt="porto1">'+
                          '<div class="card-body">'+
                            '<h5 class="card-title text-blue fw-bold">'+ porto.name +'</h5>'+
                            '<p class="card-text">'+ porto.title +'</p>'+
                            '<a href="'+ porto.url +'" target="_blank" onClick="'+ porto.event +'" class="btn btn-second text-white"><i class="bx bx-link-alt"></i></a>'+
                            '<a href="porto-details.html?params=' + encodeURIComponent(ParamsEncode) + '" class="btn btn-blue text-white ms-2">Detail</a>'+
                          '</div>'+
                        '</div>'+
                      '</div>';
                    }
                  $('#'+ outputId).append(cardFilterd);
                 }
            });
        }
    );
 }

 //alert function

 function showAlert() {
    Swal.fire({
        title: "Oops!",
        text: "I apologize, but the application or website is currently undergoing internal maintenance within the company.",
        imageUrl: "../src/img/monters.apng",
        imageWidth: 200,
        imageHeight: 200,
        confirmButtonText: `<i class='bx bx-check-double'></i> OK`,
        confirmButtonColor: "#0044ff",
    });
 }

 getFilteredPortoByCategory("Web Development", "card-web");
 getFilteredPortoByCategory("UI/UX Design", "card-design");