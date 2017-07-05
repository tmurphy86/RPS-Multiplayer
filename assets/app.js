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

 	var provider = new firebase.auth.GoogleAuthProvider();
 	 // this.auth.signInWithPopup(provider);

 	//User ID for messaging
 	// var myUserId = firebase.auth().currentUser.uid;


 	// Initializes FriendlyChat.
function FriendlyChat() {
  this.checkSetup();

  // Shortcuts to DOM Elements.
  this.messageList = document.getElementById('messages');
  this.messageForm = document.getElementById('message-form');
  this.messageInput = document.getElementById('message');
  this.submitButton = document.getElementById('submit');
  this.submitImageButton = document.getElementById('submitImage');
  this.imageForm = document.getElementById('image-form');
  this.mediaCapture = document.getElementById('mediaCapture');
  this.userPic = document.getElementById('user-pic');
  this.userName = document.getElementById('user-name');
  this.signInButton = document.getElementById('sign-in');
  this.signOutButton = document.getElementById('sign-out');
  this.signInSnackbar = document.getElementById('must-signin-snackbar');

  // Saves message on form submit.
  this.messageForm.addEventListener('submit', this.saveMessage.bind(this));
  this.signOutButton.addEventListener('click', this.signOut.bind(this));
  this.signInButton.addEventListener('click', this.signIn.bind(this));

  // Toggle for the button.
  var buttonTogglingHandler = this.toggleButton.bind(this);
  this.messageInput.addEventListener('keyup', buttonTogglingHandler);
  this.messageInput.addEventListener('change', buttonTogglingHandler);

  // Events for image upload.
  this.submitImageButton.addEventListener('click', function(e) {
    e.preventDefault();
    this.mediaCapture.click();
  }.bind(this));
  this.mediaCapture.addEventListener('change', this.saveImageMessage.bind(this));

  this.initFirebase();
}

// Sets up shortcuts to Firebase features and initiate firebase auth.
FriendlyChat.prototype.initFirebase = function() {
  // TODO(DEVELOPER): Initialize Firebase.
};

// Loads chat messages history and listens for upcoming ones.
FriendlyChat.prototype.loadMessages = function() {
  // TODO(DEVELOPER): Load and listens for new messages.
};

// Saves a new message on the Firebase DB.
FriendlyChat.prototype.saveMessage = function(e) {
  e.preventDefault();
  // Check that the user entered a message and is signed in.
  if (this.messageInput.value && this.checkSignedInWithMessage()) {

    // TODO(DEVELOPER): push new message to Firebase.

  }
};

// Sets the URL of the given img element with the URL of the image stored in Cloud Storage.
FriendlyChat.prototype.setImageUrl = function(imageUri, imgElement) {
  imgElement.src = imageUri;

  // TODO(DEVELOPER): If image is on Cloud Storage, fetch image URL and set img element's src.
};

// Saves a new message containing an image URI in Firebase.
// This first saves the image in Firebase storage.
FriendlyChat.prototype.saveImageMessage = function(event) {
  event.preventDefault();
  var file = event.target.files[0];

  // Clear the selection in the file picker input.
  this.imageForm.reset();

  // Check if the file is an image.
  if (!file.type.match('image.*')) {
    var data = {
      message: 'You can only share images',
      timeout: 2000
    };
    this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
    return;
  }
  // Check if the user is signed-in
  if (this.checkSignedInWithMessage()) {

    // TODO(DEVELOPER): Upload image to Firebase storage and add message.

  }
};

// Signs-in Friendly Chat.
FriendlyChat.prototype.signIn = function() {
  // TODO(DEVELOPER): Sign in Firebase with credential from the Google user.
};

// Signs-out of Friendly Chat.
FriendlyChat.prototype.signOut = function() {
  // TODO(DEVELOPER): Sign out of Firebase.
};

// Triggers when the auth state change for instance when the user signs-in or signs-out.
FriendlyChat.prototype.onAuthStateChanged = function(user) {
  if (user) { // User is signed in!
    // Get profile pic and user's name from the Firebase user object.
    var profilePicUrl = null;   // TODO(DEVELOPER): Get profile pic.
    var userName = null;        // TODO(DEVELOPER): Get user's name.

    // Set the user's profile pic and name.
    this.userPic.style.backgroundImage = 'url(' + profilePicUrl + ')';
    this.userName.textContent = userName;

    // Show user's profile and sign-out button.
    this.userName.removeAttribute('hidden');
    this.userPic.removeAttribute('hidden');
    this.signOutButton.removeAttribute('hidden');

    // Hide sign-in button.
    this.signInButton.setAttribute('hidden', 'true');

    // We load currently existing chant messages.
    this.loadMessages();

    // We save the Firebase Messaging Device token and enable notifications.
    this.saveMessagingDeviceToken();
  } else { // User is signed out!
    // Hide user's profile and sign-out button.
    this.userName.setAttribute('hidden', 'true');
    this.userPic.setAttribute('hidden', 'true');
    this.signOutButton.setAttribute('hidden', 'true');

    // Show sign-in button.
    this.signInButton.removeAttribute('hidden');
  }
};

// Returns true if user is signed-in. Otherwise false and displays a message.
FriendlyChat.prototype.checkSignedInWithMessage = function() {
  /* TODO(DEVELOPER): Check if user is signed-in Firebase. */

  // Display a message to the user using a Toast.
  var data = {
    message: 'You must sign-in first',
    timeout: 2000
  };
  this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
  return false;
};

// Saves the messaging device token to the datastore.
FriendlyChat.prototype.saveMessagingDeviceToken = function() {
  // TODO(DEVELOPER): Save the device token in the realtime datastore
};

// Requests permissions to show notifications.
FriendlyChat.prototype.requestNotificationsPermissions = function() {
  // TODO(DEVELOPER): Request permissions to send notifications.
};

// Resets the given MaterialTextField.
FriendlyChat.resetMaterialTextfield = function(element) {
  element.value = '';
  element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
};

// Template for messages.
FriendlyChat.MESSAGE_TEMPLATE =
    '<div class="message-container">' +
      '<div class="spacing"><div class="pic"></div></div>' +
      '<div class="message"></div>' +
      '<div class="name"></div>' +
    '</div>';

// A loading image URL.
FriendlyChat.LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';

// Displays a Message in the UI.
FriendlyChat.prototype.displayMessage = function(key, name, text, picUrl, imageUri) {
  var div = document.getElementById(key);
  // If an element for that message does not exists yet we create it.
  if (!div) {
    var container = document.createElement('div');
    container.innerHTML = FriendlyChat.MESSAGE_TEMPLATE;
    div = container.firstChild;
    div.setAttribute('id', key);
    this.messageList.appendChild(div);
  }
  if (picUrl) {
    div.querySelector('.pic').style.backgroundImage = 'url(' + picUrl + ')';
  }
  div.querySelector('.name').textContent = name;
  var messageElement = div.querySelector('.message');
  if (text) { // If the message is text.
    messageElement.textContent = text;
    // Replace all line breaks by <br>.
    messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
  } else if (imageUri) { // If the message is an image.
    var image = document.createElement('img');
    image.addEventListener('load', function() {
      this.messageList.scrollTop = this.messageList.scrollHeight;
    }.bind(this));
    this.setImageUrl(imageUri, image);
    messageElement.innerHTML = '';
    messageElement.appendChild(image);
  }
  // Show the card fading-in.
  setTimeout(function() {div.classList.add('visible')}, 1);
  this.messageList.scrollTop = this.messageList.scrollHeight;
  this.messageInput.focus();
};

// Enables or disables the submit button depending on the values of the input
// fields.
FriendlyChat.prototype.toggleButton = function() {
  if (this.messageInput.value) {
    this.submitButton.removeAttribute('disabled');
  } else {
    this.submitButton.setAttribute('disabled', 'true');
  }
};

// Checks that the Firebase SDK has been correctly setup and configured.
FriendlyChat.prototype.checkSetup = function() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions and make ' +
        'sure you are running the codelab using `firebase serve`');
  }
};

window.onload = function() {
  window.friendlyChat = new FriendlyChat();
};


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

	  	console.log("Game is on" + dataRef.users.user2.child('name'));



	    // change the HTML to reflect the newly updated local values (most recent information from firebase)
	    $("#one").html(snapshot.val().user1.name);
	    $(".player2").html(dataRef.users.user2.child('name'));

	  }else if (snapshot.child("user1").exists()){
	  	console.log("just one of us");
	  	console.log(snapshot.val());
	  	$("#one").html(snapshot.val(user1.child('name')));


	  }else {
	  	console.log("game hasn't started");
	  	console.log(snapshot.val());
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
    	// htmlWrite();

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
	
	