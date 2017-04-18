var request = require("request");
var keys = require("./keys.js")
var Twitter = require('twitter');
var spotify = require('spotify');

var userAction = process.argv[2];
var userRequest =process.argv[3];
//console.log(userRequest);
var client = keys.twitterKeys;
//console.log(client);

switch(userAction){
	case "my-tweets":
	twitter();
	break;

	case "spotify-this-song":
	spotifying();
	break;

	case "movie-this":
	movify();
	break;
}


function twitter(){
	console.log("hello");
	var params = {screen_name: '@RihadBouazizi', count: 20};
client.get('statuses/user_timeline', function(error, tweets, response) {
	
  if(error){
   console.log(error);
	}

  console.log("My tweets: "+JSON.stringify(response, null,1));   
  //console.log(response);  

			});
		}

		//console.log(process.argv.length);

function movify(){
		if(userRequest===undefined){		
		omdb="http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&r=json&tomatoes=true";
	}

	for(var i = 4; i<process.argv.length; i++){
	userRequest=userRequest+"+"+process.argv[i];
	var omdb = "http://www.omdbapi.com/?t="+userRequest+"&y=&plot=short&r=json&tomatoes=true";
		
	}
	
	//console.log(omdb);
	
	request(omdb, function(error, response, body) {

   if (!error && response.statusCode === 200) {
   	console.log("Title: "+JSON.parse(body).Title);
   	console.log("Released in: "+JSON.parse(body).Year);
    console.log("Imdb Rating: "+JSON.parse(body).imdbRating);
    console.log("Made in: "+JSON.parse(body).Country);
    console.log("Languages: "+JSON.parse(body).Language);
    console.log("Plot: "+JSON.parse(body).Plot);
    console.log("Featuring: "+JSON.parse(body).Actors);
    console.log("Rotten Tomatoes Rating: "+JSON.parse(body).tomatoRating);
    console.log("Rotten Tomatoes URL.: "+JSON.parse(body).tomatoURL);


      }
});

}

function spotifying(){

		if(userRequest===undefined){		
		userRequest="The+Sign";
	}

	for(var i = 4; i<process.argv.length; i++){
	userRequest=userRequest+"+"+process.argv[i];
			
	}

	spotify.search({ type: 'track', query: userRequest }, function(err, data) {
    	if ( err ) {
        console.log('Error occurred: ' + err);
        
    }
 
    //console.log(JSON.stringify(data[2], null, 1));
    console.log(JSON.stringify(data.tracks.items[1].artists, null, 1));
});
}
