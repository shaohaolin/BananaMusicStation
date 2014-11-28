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
      var tableContent ='';

      if (!$('#tracklist').is(":empty")){
        $('#tracklist').empty();
      }

  		$(tracksListData).each(function(index, track) {
  			$('#tracklist').append($('<li></li>').html(track.title + ' - ' + track.genre));
        $('#tracklist').append('<div id = tracks'+index+'></div>');
        //oEmbed function() hard code my favourite song to System.
        SC.oEmbed(tracksListData[index].permalink_url, document.getElementById('tracks'+index));

        //table code
         tableContent += '<tr>';
         tableContent += '<td>' + track.title + '</td>';
         tableContent += '<td><a href="#" class="linkdeletesong" rel="' + index + '">Dislike</a></td>';
         tableContent += '</tr>';
  		});

        // Inject the whole content string into our existing HTML table
        $('#musicList table tbody').html(tableContent);


  		//oEmbed function() hard code my favourite song to System.
      //SC.oEmbed(tracksListData[0].permalink_url, document.getElementById("track"));
    });
});



$("#hiphop").on("click", getMusic);
$("#country").on("click", getMusic);
$("#pop").on("click", getMusic);
$("#electronic").on("click", getMusic);
$("#musicList table tbody").on('click','td a.linkdeletesong',deleteThisSong);

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

      var tableContent ='';

      if (!$('#tracklist').is(":empty")){
        $('#tracklist').empty();
      }

      $(tracksListData).each(function(index, track) {
        
        $('#tracklist').append($('<li></li>').html(track.title + ' - ' + track.genre));
        $('#tracklist').append('<div id = tracks'+index+'></div>');
        //oEmbed function() hard code my favourite song to System.
        SC.oEmbed(tracksListData[index].permalink_url, document.getElementById('tracks'+index));

        //table code
         tableContent += '<tr>';
         tableContent += '<td>' + track.title + '</td>';
         tableContent += '<td><a href="#" class="linkdeletesong" rel="' + index + '" >Dislike</a></td>';
         tableContent += '</tr>';

      });

        // Inject the whole content string into our existing HTML table
        $('#musicList table tbody').html(tableContent);
};


function deleteThisSong(event){

   // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {
      
      var index = $(this).attr('rel') ;

      alert(index);
      tracksListData.splice(index,1);
      var tableContent ='';
      if (!$('#tracklist').is(":empty")){
        $('#tracklist').empty();
      }

      $(tracksListData).each(function(index, track) {
        
        $('#tracklist').append($('<li></li>').html(track.title + ' - ' + track.genre));
        $('#tracklist').append('<div id = tracks'+index+'></div>');
        //oEmbed function() hard code my favourite song to System.
        SC.oEmbed(tracksListData[index].permalink_url, document.getElementById('tracks'+index));

        //table code
         tableContent += '<tr>';
         tableContent += '<td>' + track.title + '</td>';
         tableContent += '<td><a href="#" class="linkdeletesong" rel="' + index + '" >Dislike</a></td>';
         tableContent += '</tr>';

      });

        // Inject the whole content string into our existing HTML table
        $('#musicList table tbody').html(tableContent);
    }
};

