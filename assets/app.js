$(function() {
	// Links to Firebase
	var config = {
		apiKey: "AIzaSyAsLgbVFMsHNpveBLARrM0nV3JmUo208GE",
		authDomain: "rps-murphy.firebaseapp.com",
		databaseURL: "https://rps-murphy.firebaseio.com",
		projectId: "rps-murphy",
		storageBucket: "rps-murphy.appspot.com",
		messagingSenderId: "758823963966"
 	 };

 	firebase.initializeApp(config);
 	//DB ref
 	var dataRef = firebase.database();
 	 // Capture Button Click
    $("#addName").on("click", function(event) {
      event.preventDefault();
      setPlayer();

 	 });

    $('#addMessage').on('click',function(event) {
      event.preventDefault();
      deleteShit();

	 });


    dataRef.ref("users").on("value", function(snapshot) {

	  // If Firebase has users
	  if (snapshot.child("user1").exists() && snapshot.child("user2").exists()) {

	  	console.log("Game is on");



	    // change the HTML to reflect the newly updated local values (most recent information from firebase)
	    $(".player1").html(snapshot.val().user1);
	    $(".player2").html(snapshot.val().user2);

	  }else if (snapshot.child("user1").exists()){
	  	console.log("just one of us")
	  	$(".player1").html(snapshot.val().user1);

	  }else {
	  	console.log("game hasn't started");
	  }
	});

    // class="circle responsive-img">

	function setPlayer() {
		name = $("#name-input").val().trim();
		$('#name-input').val('');
		dataRef.ref("users/user1").once("value")
  		.then(function(snapshot) {
			if (snapshot.hasChildren()){
				dataRef.ref("users/user2").push({
	    			name: name
    			});
			}else{
				dataRef.ref("users/user1").push({
	    		name: name
    			});
			}
		});
    	htmlWrite();

    }



    	// dataRef.ref("choices").push({
    	// 	name: true
    	// });

	function deleteShit() {
		dataRef.ref("users").remove();
	}

	function htmlWrite() {
		$('.player1').html('Player'+ dataRef.ref('users').child.name);
		$('.player2').html('Player'+ dataRef.ref('users').child.name);

		// //Gets player names
		// name[key] = childSnapshot.val().name;
		// // Remove loading and add player name
		// var waiting = $('.player' + key + ' > .waiting');
		// waiting.empty();
		// var $h1 = $('<h1>').text(name[key]);
		// waiting.append($h1);				

	}

	// connectionsRef references a specific location in our database.
	// All of our connections will be stored in this directory.
	var connectionsRef = dataRef.ref("/connections");

	// '.info/connected' is a special location provided by Firebase that is updated
	// every time the client's connection state changes.
	// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
	var connectedRef = dataRef.ref(".info/connected");

	// When the client's connection state changes...
	connectedRef.on("value", function(snap) {

	  // If they are connected..
	  if (snap.val()) {
	  	
		// Add user to the connections list.
	    var con = connectionsRef.push(true);

	    // Remove user from the connection list when they disconnect.
   		con.onDisconnect().remove();
   		console.log("disconnect means restarting the game");
   		deleteShit();
	
	    // When first loaded or when the connections list changes...
		connectionsRef.on("value", function(snap) {
			if (snap.numChildren() <= 2) {
				console.log("When equal less than 2" + snap.numChildren());

				// Display the viewer count in the html.
				// The number of online users is the number of children in the connections list.
				// $("#connected-viewers").html(snap.numChildren());
			} else {
				console.log("Game already in progress" + connectedRef);
			}

		});

	  }
	    
	});




	// Initialize variables
	var player;
	var otherPlayer;
	var name = {};
	var userRef;
	var wins1, wins2, losses1, losses2;
	
	var choices = ['rock','paper','scissors'];



});
	
	