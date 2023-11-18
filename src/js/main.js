$(document).ready(function() {
    // Hide the preloader when the page is fully loaded
    $(window).on('load', function() {
      $('#preloader').fadeOut('slow');
    });
  });

function renderHtml(id, page) {
    $.ajax({
        type: 'GET',
        url: '/pages/'+page+'.html',
        success: function (file_html) {
            $('#'+id).html(file_html);
        }
    });
  }

renderHtml('render-header','header');
renderHtml('render-navbar', 'navbar')
renderHtml('render-footer','footer');


// Media Query
$(document).ready(function () {
    function toggleVisibility() {
        var windowWidth = $(window).width();
        var divId = $('#lottie-container');

        if (windowWidth <= 768) {
            divId.hide();
            $('#about').addClass('mb-5');
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