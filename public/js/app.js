/* CLIENT-SIDE JS */

$(document).ready(function() {
  var kanyeAlbums; 

  //grab Kanye Albums from backend and immediately render them
  $.ajax({url: '/api/albums', success: function(result) {
    result.forEach(renderAlbum);
  }});

  //serialize form data
  $('form').on('submit', function(event) {
    event.preventDefault();
    var formData = $('form').serialize();
    console.log(formData);
    $.post('/api/albums', formData);
    $('form').trigger('reset');
  });

});

function renderAlbum(album) {
  var albumHtml =
  "        <!-- one album -->" +
  "        <div class='row album' data-album-id='" + album._id + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin album internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-3 col-xs-12 thumbnail album-art'>" +
  "                     <img src='" + "http://placehold.it/400x400'" +  " alt='album image'>" +
  "                  </div>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Album Name:</h4>" +
  "                        <span class='album-name'>" + album.name + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Artist Name:</h4>" +
  "                        <span class='artist-name'>" +  album.artistName+ "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Released date:</h4>" +
  "                        <span class='album-releaseDate'>" + album.releaseDate + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Genres:</h4>" +
  "                        <span class='album-genres'>" + album.genres + "</span>" +
  "                      </li>" +
  "                     <li class='list-group-item'>" +
  "                       <h4 class='inline-header'>Songs:</h4>" + 
  "                       <span class='song_list'>" + buildSongsHTML(album.songs) + "</span>" +
  "                     </li>" +
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of album internal row -->" +

  "              </div>" + // end of panel-body

  "              <div class='panel-footer'>" +
  "               <button class='btn btn-primary add-song'>Add Song</button>" +
  "              </div>" +

  "            </div>" +
  "          </div>" +
  "          <!-- end one album -->";
     $('#albums').append(albumHtml);
}

function buildSongsHTML(songs) {
  console.log(songs);
  var songText = '- ';
  var songsHTML = " ";
  songs.forEach(function(song) {
    songText = '(' + song.trackNumber + ') ' + song.name + ' -';
    songsHTML += songText + " ";
    console.log(songsHTML);
  });
  console.log(songsHTML);
  return songsHTML;
}
