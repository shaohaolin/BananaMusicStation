SC.initialize({
    client_id: '0e2f4290ff93af6c624a9a7c52526231',
    redirect_uri: 'http://104.131.97.125:8380'
});

var tracksListData = [];
var baseURL = "http://104.131.97.125:8380";

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
         tableContent += '<td><a href="#" class="linkshowComment" rel="' + track.id + '">Show</a></td>';
         tableContent += '<td><a href="#" class="linkaddComment" rel="' + track.id + '">Add</a></td>';
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
$("#musicList table tbody").on('click','td a.linkaddComment',addMusicComment);
$("#btnAddComment").on('click', addComment);

function addComment(event) {


  // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;

    $('#addUser input').each(function(index, val) {
        if($(this).val() === '' || ($('#addUser fieldset input#inputMessage').val().split('')[0] !=='#')) {errorCount++;}
    });

    // If it is, compile all user info into one object
    if (errorCount === 0) {

        var newComment = {
          'musicID' : $('#addComment fieldset input#musicID').val(),
          'comment' : $('#addComment fieldset input#inputComment').val()
        }

        // Use AJAX to post the object to our addcomment service
        $.ajax({
            type: 'POST',
            data: newComment,
            url: '/users/addcomment',
            dataType: 'JSON'
        }).done(function (response) {

           // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addComment fieldset input').val('');
            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: '+response.msg);
            }
        });
    }
     else {
        // If errorCount is more that 0, error out
        alert('Please fill in all fields');
        return false;
    }

};


function addMusicComment(event){

    var music_id = $(this).attr('rel') ;
    
    // automatically fill in the music id
    $("#musicID").val(music_id);

};


function showMusicComment(event) {

  if (!$('#commentList').is(":empty")){
        $('#commentList').empty();
      }

  var music_id = $(this).attr('rel') ;
  
  var findComment = 0;
  // jQuery AJAX call for JSON
    $.getJSON( '/users/musiclist', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            if(this.musicID == music_id){
              findComment = 1;
              $('#commentList').append($('<li></li>').html(this.comment));
              
            }
        });
        if (findComment == 0) {
          var msg = "No comment is created for this song.";
          $('#commentList').append($('<li></li>').html(msg));
        }
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
         tableContent += '<td><a href="#" class="linkshowComment" rel="' + track.id + '">Show</a></td>';
         tableContent += '<td><a href="#" class="linkaddComment" rel="' + track.id + '">Add</a></td>';
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
         tableContent += '<td><a href="#" class="linkshowComment" rel="' + track.id + '">Show</a></td>';
         tableContent += '<td><a href="#" class="linkaddComment" rel="' + track.id + '">Add</a></td>';
         tableContent += '</tr>';

      });


        // Inject the whole content string into our existing HTML table
        $('#musicList table tbody').html(tableContent);
    }
};

