$(document).ready(function() {

	SC.initialize({
    client_id: "0e2f4290ff93af6c624a9a7c52526231"
  });

  $("#loadTracks").live("click", function(){
    SC.get("/tracks", {limit: 1}, function(tracks){
      var track = tracks[0];
      SC.oEmbed(track.uri, document.getElementById("track"));
    });
  });
});