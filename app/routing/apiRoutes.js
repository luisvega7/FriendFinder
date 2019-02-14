//our variable of "friends that holds all our data"

const friends = require("../data/friends");

//like UPS we have them ROUTES ..... 
module.exports = function(app) {

// API GET request 
// routing our full list of friends located in our "database"
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  // API POST Requests
  //post the information user inputs.
  app.post("/api/friends", function(req, res) {
    
    // We will use this object to hold the "best match". We will constantly update it as we
    // loop through all of the options
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: Infinity
    };

    // taking user's survey POSTing it and parse it.
    var userData = req.body;
    var userScores = userData.scores;

 
    //variable that will round up the difference of the users score
    //and those in the database. 
    var totalDifference;

    //for loop that will loop through all the possibilities in the database.
    for (var i = 0; i < friends.length; i++) {
      var currentFriend = friends[i];
      totalDifference = 0;
      //console logging the our current friend. 
      console.log(currentFriend.name);

      // We then loop through all the scores of each friend
      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];

        // We calculate the difference between the scores and sum them into the totalDifference
        totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }

      
      //if statement that checks tif the sum is less then the difference of current "best match"
      if (totalDifference <= bestMatch.friendDifference) {
        // Reset the bestMatch to be the new friend.
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.friendDifference = totalDifference;
      }
    }

    // Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
    // the database will always return that the user is the user's best friend).
    friends.push(userData);

    // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page
    res.json(bestMatch);
  });
};
