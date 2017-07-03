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

    // class="circle responsive-img">

	function setPlayer() {
			name = $("#name-input").val().trim();
			$('#name-input').empty();
		

			dataRef.ref("users").push({
        		name: name
        	});

        	dataRef.ref("choices").push({
        		name: true
        	});

	}

	function deleteShit() {
		dataRef.ref("users").remove();
	}

	function htmlWrite() {
		//Gets player names
		name[key] = childSnapshot.val().name;
		// Remove loading and add player name
		var waiting = $('.player' + key + ' > .waiting');
		waiting.empty();
		var $h1 = $('<h1>').text(name[key]);
		waiting.append($h1);				

	}



	// Initialize variables
	var player;
	var otherPlayer;
	var name = {};
	var userRef;
	var wins1, wins2, losses1, losses2;
	
	var choices = ['rock','paper','scissors'];



});
	
	