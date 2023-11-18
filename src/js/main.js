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