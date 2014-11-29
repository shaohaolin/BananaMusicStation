SC.initialize({
    client_id: '0e2f4290ff93af6c624a9a7c52526231',
    redirect_uri: 'http://localhost:3000'
});

var tracksListData = [];
var baseURL = "http://localhost:3000";

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
         tableContent += '<td><a href="#" class="linkshowComment" rel="' + track.id + '">Show Comment</a></td>';
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
$("#musicList table tbody").on('click','td a.linkshowComment',showMusicComment);


function showMusicComment(event) {

  if (!$('#commentList').is(":empty")){
        $('#commentList').empty();
      }

  var music_id = $(this).attr('rel') ;
  alert("Music ID: " +music_id);
  // jQuery AJAX call for JSON
    $.getJSON( '/users/musiclist', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            if(this.musicID == music_id){
              $('#commentList').append($('<li></li>').html(this.comment));
              
            }
        });
    });

};



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
         tableContent += '<td><a href="#" class="linkshowComment" rel="' + track.id + '">Show Comment</a></td>';
         tableContent += '</tr>';

      });

        // Inject the whole content string into our existing HTML table
        $('#musicList table tbody').html(tableContent);
};


function deleteThisSong(event){

   // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this song?');

    // Check and make sure the user confirmed
    if (confirmation === true) {
      
       $('#commentList').empty();
      
      var index = $(this).attr('rel') ;

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
         tableContent += '<td><a href="#" class="linkshowComment" rel="' + track.id + '">Show Comment</a></td>';
         tableContent += '</tr>';

      });


        // Inject the whole content string into our existing HTML table
        $('#musicList table tbody').html(tableContent);
    }
};

