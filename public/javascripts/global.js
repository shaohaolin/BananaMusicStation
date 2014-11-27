SC.initialize({
    client_id: '0e2f4290ff93af6c624a9a7c52526231',
    redirect_uri: 'http://localhost:3000'
});

var tracksListData = [];
var baseURL = "http://localhost:3000"

$(document).ready(function() {

	//Playing the music live
  $("#loadTracks").on("click", function(){

  		var url = baseURL+"/tracks";
  		xmlhttp = new XMLHttpRequest();

  		xmlhttp.open("GET",url,false);
  		xmlhttp.send();
  		xmlDoc = xmlhttp.responseText;

  		//alert(xmlDoc); 
  		var info = JSON.parse(xmlDoc);
  		tracksListData = info;

      if (!$('#tracklist').is(":empty")){
        $('#tracklist').empty();
      }

  		$(info).each(function(index, track) {
  			$('#tracklist').append($('<li></li>').html(track.title + ' - ' + track.genre));
        $('#tracklist').append('<div id = tracks'+index+'></div>');
        //oEmbed function() hard code my favourite song to System.
        SC.oEmbed(tracksListData[index].permalink_url, document.getElementById('tracks'+index));
  		});

  		//oEmbed function() hard code my favourite song to System.
      //SC.oEmbed(tracksListData[0].permalink_url, document.getElementById("track"));
    });
});

$("#hiphop").on("click", getMusic);
$("#country").on("click", getMusic);
$("#pop").on("click", getMusic);
$("#electronic").on("click", getMusic);

function getMusic(event){

      var musicType = $(this).attr('id');

      var url = baseURL+"/tracks/"+musicType;
      xmlhttp = new XMLHttpRequest();

      xmlhttp.open("GET",url,false);
      xmlhttp.send();
      xmlDoc = xmlhttp.responseText;

      //alert(xmlDoc); 
      var info = JSON.parse(xmlDoc);
      tracksListData = info;

      if (!$('#tracklist').is(":empty")){
        $('#tracklist').empty();
      }

      $(info).each(function(index, track) {
        
        $('#tracklist').append($('<li></li>').html(track.title + ' - ' + track.genre));
        $('#tracklist').append('<div id = tracks'+index+'></div>');
        //oEmbed function() hard code my favourite song to System.
        SC.oEmbed(tracksListData[index].permalink_url, document.getElementById('tracks'+index));
      });

};



