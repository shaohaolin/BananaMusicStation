SC.initialize({
    client_id: '0e2f4290ff93af6c624a9a7c52526231'
});

$(document).ready(function() {

	//Playing the music live
  $("#loadTracks").on("click", function(){
    SC.get("/tracks", {limit: 1}, function(tracks){
      var track = tracks[0];
      SC.oEmbed(track.uri, document.getElementById("track"));
    });
  });

  //Get the track of the music with hiphop type	
  SC.get('/tracks', { genres: 'hiphop' }, function(tracks) {
    $(tracks).each(function(index, track) {
      $('#results').append($('<li></li>').html(track.title + ' - ' + track.genre));
    });
  });


  

});