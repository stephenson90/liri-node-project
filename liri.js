var request = require("request");
var keys = require("./keys.js");
var Twitter = require('twitter');
var spotify = require('spotify');
var userAction = process.argv[2];
var userRequest ="";


var fs = require("fs");
var output;


//console.log(userRequest);

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

	case "do-what-it-says":
	randomify();
	break;
}




		//console.log(process.argv.length);

function movify(){
		if(userRequest===undefined){		
		omdb="http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&r=json&tomatoes=true";
	}

	for(var i = 3; i<process.argv.length; i++){
	userRequest= userRequest+"+"+process.argv[i];
	var omdb = "http://www.omdbapi.com/?t="+userRequest+"&y=&plot=short&r=json&tomatoes=true";
		
	}
	
	//console.log(userRequest);
	//console.log(process.argv);
	
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

    fs.appendFile("log.txt", "---------------------------<br>", function(err) {
  
  				if (err) {
    		 		console.log(err);
  				}  


			});

    	fs.appendFile("log.txt",body, function(err) {
  
  			if (err) {
    		return console.log(err);
  			}  


			});


      }
});

}

function spotifying(){

		if(userRequest===undefined){		
		userRequest="The+Sign";
	}

	for(var i = 3; i<process.argv.length; i++){
	userRequest=userRequest+"+"+process.argv[i];
			
	}

	spotify.search({ type: 'track', query: userRequest }, function(err, data) {
    	if ( err ) {
        console.log('Error occurred: ' + err);
        
    } 

    	fs.appendFile("log.txt", "---------------------------<br>", function(err) {
  
  				if (err) {
    		 		console.log(err);
  				}  


			});

    	fs.appendFile("log.txt", JSON.stringify(data.tracks.items[1]), function(err) {
  
  				if (err) {
    		 		console.log(err);
  				}  


			});

    console.log("Artist: ")
    console.log(JSON.stringify(data.tracks.items[1].artists[0].name, null, 1));
    console.log("Track: ")
    console.log( data.tracks.items[2].name);
    console.log("album: ")
    console.log(JSON.stringify(data.tracks.items[1].name, null, 1));
    console.log("Preview Link: ")
    console.log(JSON.stringify(data.tracks.items[1].preview_url, null, 1));
    
       
});
}



function randomify(){
	fs.readFile("random.txt", "utf8", function(err, data) {

		output = data.split(","); 
		//console.log(output);
	

	
		var randomSelect = Math.floor(Math.random()*2);
   
    if(randomSelect===1){
    	userRequest=output[3];
    	console.log(userRequest);
    	movify();
    }

    else if (randomSelect===0){
    	userRequest=output[1];
    	spotifying();
    }
    });

}

function twitter(){
	var client = new Twitter(keys);

	//console.log("hello");
	var params = {screen_name: 'RihadBouazizi', count: 20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
	
  if(error){
   console.log(error);
	}

	for(var i = 0; i<20; i++){

		console.log("Created on: "+ tweets[i].created_at);

  console.log("My tweets: "+tweets[i].text);   
  //console.log(response);  
  fs.appendFile("log.txt", "---------------------------<br>", function(err) {
  
  				if (err) {
    		 		console.log(err);
  				}  


			});

    fs.appendFile("log.txt",tweets[i].text, function(err) {
  
  if (err) {
    console.log(err);
  }  


});
}


			});
}
		
