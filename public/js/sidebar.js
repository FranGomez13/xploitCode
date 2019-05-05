jQuery(function ($) {

    $(".sidebar-dropdown > a").click(function() {
  $(".sidebar-submenu").slideUp(200);
  if (
    $(this)
      .parent()
      .hasClass("active")
  ) {
    $(".sidebar-dropdown").removeClass("active");
    $(this)
      .parent()
      .removeClass("active");
  } else {
    $(".sidebar-dropdown").removeClass("active");
    $(this)
      .next(".sidebar-submenu")
      .slideDown(200);
    $(this)
      .parent()
      .addClass("active");
  }
});

$("#close-sidebar").click(function() {
  $(".page-wrapper").removeClass("toggled");
});
$("#show-sidebar").click(function() {
  $(".page-wrapper").addClass("toggled");
});
});

$(document).ready(function(){
  $("#popup").dialog({
    hide: 'fold',
    show: 'fold',
    autoOpen: false,
    resizable: false,
    position: { my: "center", at: "top" }
  });
  $("#popup-profile").dialog({
    hide: 'fold',
    show: 'fold',
    autoOpen: false,
    resizable: false,
    position: { my: "center", at: "top" }
  });
  refreshFolder();
});

function profile(){
  $.ajax({
    url: `/user/${$('#userId').val()}`,
    method: 'GET',
    beforeSend: function(){
       $("#popup-profile").dialog('open').html("<p>Please Wait...</p>");
    },
    success: function(data) {
        $('#popup-profile').html(data);
    }
  });
}

function modalOpen(url){
  $.ajax({
    url: url,
    data: {"_id": $('#userId').val()},
    method: 'GET',
    beforeSend: function(){
       $("#popup").dialog('open').html("<p>Please Wait...</p>");
    },
    success: function(data) {
        $('#popup').html(data);
    }
  });
}

function modalClose(){
  $('#popup').dialog("close");
}

function modalComplete(){
  refreshFolder();
  changeFolder(window.location.pathname, $('#title-content').text());
  $('#popup').dialog("close");
}

function changeFolder(url, title){
  $('#div-contenido').html(`
    <div class="d-flex justify-content-center">
      <div class="spinner-grow text-danger" style="width: 10rem; height: 10rem; position: absolute;
    top: 35%; left: 40%" role="status">
      </div>
    </div>`
  );
  if (window.location.pathname.indexOf("/user") == -1){
    window.location.href = url;
  }
  $.ajax({
    url: url,
    data: {},
    method: 'POST',
    success: function(data) {
      refreshContent(data, title);
      window.history.pushState('', '', url);
    }
  });
}

function refreshFolder(){
  $('#folders').empty();
  $.ajax({
    url: `/user/${$('#userId').val()}/folders`,
    method:"GET",
    success:function(resp){
      for (var i=0; i<resp.length; i++){
        $('#folders').append(
          `<li><a onclick="return changeFolder('/user/folder/${resp[i]._id}', '${resp[i].name}')">${resp[i].name}</a></li>`
        );
      }
    }
  });
}

function refreshContent(data, title){
  $('#div-contenido').empty();
  if (title === 'projects'){
    $('#title-content').html(title);
    for (var i = 0; i<data.length; i++) {
      $('#div-contenido').append(
        `<div class="col-6 col-sm-4 col-md-3 col-lg-2">
          <center>
            <a href="/pen/${data[i]._id}">
              <i class="fas fa-code fa-5x"></i><br><center>${data[i].name}</center>
            </a>
          </center>
        </div>`
      );   
    }
  }else if (title === 'shared with me'){
    $('#title-content').html(title);
    for (var i = 0; i<data.length; i++) {
      $('#div-contenido').append(
        `<div class="col-6 col-sm-4 col-md-3 col-lg-2">
          <center>
            <a onclick="return loadFile('/user/file/${data[i]._id}', '${data[i].name}')">
              ${data[i].typeFile[0].icon}<br><center>${data[i].name}</center>
            </a>
          </center>
        </div>`
      );   
    }
  }else{
    if (title !== 'main'){
      $('#div-contenido').append(
          `<div class="col-6 col-sm-4 col-md-3 col-lg-2">
            <center>
              <a onclick="return changeFolder('/user/folder/${data.current[0].parent._id}', '${data.current[0].parent.name}')">
                <i class="fas fa-folder-open fa-5x"></i><br><center>...</center>
              </a>
            </center>
          </div>`
      );
    }
    $('#title-content').html(title);
    for (var i = 0; i<data.folder.length; i++) {
      $('#div-contenido').append(
        `<div class="col-6 col-sm-4 col-md-3 col-lg-2">
          <center>
            <a onclick="return changeFolder('/user/folder/${data.folder[i]._id}', '${data.folder[i].name}')">
              <i class="fas fa-folder fa-5x"></i><br><center>${data.folder[i].name}</center>
            </a>
          </center>
        </div>`
      );
    }
    for (var i = 0; i<data.file.length; i++) {
      $('#div-contenido').append(
        `<div class="col-6 col-sm-4 col-md-3 col-lg-2">
          <center>
            <a onclick="return loadFile('/user/file/${data.file[i]._id}', '${data.file[i].name}')">
              ${data.file[i].typeFile[0].icon}<br><center>${data.file[i].name}</center>
            </a>
          </center>
        </div>`
      );   
    }
  }
}