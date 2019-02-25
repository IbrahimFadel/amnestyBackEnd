var data = []
var articleName = "";
const admins = [
	'ibrahim.fadel@ucc.on.ca',
	'phillip.kong@ucc.on.ca'
]

$(document).ready(function() {
	let location = window.location.href;
	let splitLocation = location.split('/');
	articleName = splitLocation[splitLocation.length - 1].slice(0, -5);
	firebase.database().ref('/Comments/' + articleName)
	   .once('value').then(function(snapshot) {
	   	//console.log(snapshot.ref.path.pieces_[0])
	          snapshot.forEach(childSnapshot => {
	               const comments = childSnapshot.val();
	               var username = comments.username;
	               var message = comments.message;
	               var timestamp = comments.timestamp;

	               $("#comments-" + articleName).append(
		               	"<div class='div-comment'>"
		               	+	"<h5 style='display: inline;'>" + username + "</h5>"
		               	+ "<p style='display: inline; float: right; padding: 2px; padding-left: 1%;' onclick='editComment()'>Edit</p>"
		               	+ "<p style='display: inline; float: right; padding: 2px; padding-left: 1%;' onclick='deleteComment()'>Delete</p>"
		               	+ "<p style='display: inline; float: right; padding: 2px; padding-left: 1%;' onclick='reportComment()'>Report</p><br>"
		               	+ "<p style='display: inline;'>" + timestamp + "</p><br><br><br>"
		               	+ "<p style='display: inline-block;'>" + message + "</p>"
		               	+ "</div><br>"
	               	);
	          })
	    });
});

$(window).scroll(function() {
	    if ($(window).scrollTop() > 100){
	        $('nav').addClass('navigationScroll');
	    }
	    else if ($(window).scrollTop() < 100){
	        $('nav').removeClass('navigationScroll');
	    }
	});

firebase.auth().onAuthStateChanged(function(user) {
	var user = firebase.auth().currentUser;
	var userRef = firebase.database().ref().child("Users");

  if (user) {
  	if(window.location.href.indexOf("") > -1){
  		if(user.email == admins[0] || user.email == admins[1]) {
			document.getElementById("postArticleBtn").style.display = 'initial';
			console.log('Welcome, Admin: ' + user.email)
		} else {
			document.getElementById("postArticleBtn").style.display = 'none';
			console.log('You are not an Admin')
		}
  	}
	
	
  	if(window.location.href.indexOf("christiansEgypt") > -1) {
  		document.getElementById("beSignedIn-christiansEgypt").style.display = "none";
  	  	document.getElementsByClassName("commentDiv")[0].style.display = "block";
  	  	if(user.displayName != null) {
  	  		document.getElementById("christiansEgypt-name").innerHTML += user.displayName;
  	  	} else {
  	  		firebase.database().ref('/Users/')
  	  			.once('value').then(function(snapshot) {
  	  				 snapshot.forEach(childSnapshot => {
  	  				 	if(childSnapshot.val().email == user.email) {
  	  				 		document.getElementById("christiansEgypt-name").innerHTML += childSnapshot.val().username;
  	  				 	}
  	  				 });
  	  			});
  	  	}
  	} else if(window.location.href.indexOf("womensRights-SaudiaArabia") > -1) {
    	document.getElementById("beSignedIn-womensRights-SaudiaArabia").style.display = "none";
  	  	document.getElementsByClassName("commentDiv")[0].style.display = "block";
  	  	if(user.displayName != null) {
  	  		document.getElementById("womensRights-SaudiaArabia-name").innerHTML += user.displayName;
  	  	} else {
  	  		firebase.database().ref('/Users/')
  	  			.once('value').then(function(snapshot) {
  	  				 snapshot.forEach(childSnapshot => {
  	  				 	if(childSnapshot.val().email == user.email) {
  	  				 		document.getElementById("womensRights-SaudiaArabia-name").innerHTML += childSnapshot.val().username;
  	  				 	}
  	  				 });
  	  			});
  	  	}
  	} else if(window.location.href.indexOf("guanBay") > -1) {
  		document.getElementById("beSignedIn-guanBay").style.display = "none";
  	  	document.getElementsByClassName("commentDiv")[0].style.display = "block";
  	  	if(user.displayName != null) {
  	  		document.getElementById("guanBay-name").innerHTML += user.displayName;
  	  	} else {
  	  		firebase.database().ref('/Users/')
  	  			.once('value').then(function(snapshot) {
  	  				 snapshot.forEach(childSnapshot => {
  	  				 	if(childSnapshot.val().email == user.email) {
  	  				 		document.getElementById("guanBay-name").innerHTML += childSnapshot.val().username;
  	  				 	}
  	  				 });
  	  			});
  	  	}
  	} else if(window.location.href.indexOf("login") > -1) {
   		document.getElementById("loginDiv").style.display = "none";
   		document.getElementById("deleteAccountDiv").style.display = "block";
   	} else if(window.location.href.indexOf("signup") > -1) {
		document.getElementById("signedInDiv").style.display = "block";
	}
  } else {
  	if(window.location.href.indexOf("login") > -1) {
    	document.getElementById("loginDiv").style.display = "block";
    	document.getElementById("deleteAccountDiv").style.display = "none";
    } else if(window.location.href.indexOf("womensRights-SaudiaArabia") > -1) {
    	document.getElementById("beSignedIn-womensRights-SaudiaArabia").style.display = "block";
  	  	document.getElementsByClassName("commentDiv")[0].style.display = "none";
  	} else if(window.location.href.indexOf("christiansEgypt") > -1) {
  		document.getElementById("beSignedIn-christiansEgypt").style.display = "block";
   	 	document.getElementsByClassName("commentDiv")[0].style.display = "none";
   	} else if(window.location.href.indexOf("guanBay") > -1) {
		document.getElementById("beSignedIn-guanBay").style.display = "block";
   	 	document.getElementsByClassName("commentDiv")[0].style.display = "none";
   	} else if(window.location.href.indexOf("signup") > -1) {
    	document.getElementById("signedInDiv").style.display = "none";
    }
  }
});

function createAccount() {
	var usersRef = firebase.database().ref().child("Users");

	var email = document.getElementById("email-signup").value;
	var password = document.getElementById("password-signup").value;
	var username = document.getElementById("username-signup").value;
	binEncryptedPassword = convertBin(password);
	hexEncryptedPassword = convertHex(binEncryptedPassword);
	firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
		usersRef.push({
			email: email,
			username: username,
			password: hexEncryptedPassword
		})
		Swal.fire({
		  title: 'Success! Your account has been created!',
		  type: 'success',
		  animation: false,
		  customClass: 'animated tada'
		})
	}).catch(function(error) {
	  var errorCode = error.code;
	  var errorMessage = error.message;
  		Swal.fire({
		  type: 'error',
		  title: 'Oops...',
		  text: 'Something went wrong!\n' + errorMessage,
		  footer: 'If you think this is a mistake, please contact us.'
		})
	});
	
	document.getElementById("email-signup").value = "";
	document.getElementById("password-signup").value = "";
	document.getElementById("username-signup").value = "";
}

function login() {
	var email = document.getElementById("email-login").value;
	var password = document.getElementById("password-login").value;

	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  window.alert("Error: " + errorCode + errorMessage );
	});
}

function loginGoogle() {
	// window.location.href = "login.html";
	setTimeout(function() {
		var provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider).then(function(result) {
		  // This gives you a Google Access Token. You can use it to access the Google API.
		  var token = result.credential.accessToken;
		  // The signed-in user info.
		  var user = result.user;
		  // ...
		}).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // The email of the user's account used.
		  var email = error.email;
		  // The firebase.auth.AuthCredential type that was used.
		  var credential = error.credential;
		  // ...
		});
	},  1000);
	

	
}

function logout() {
    console.log("LOGGING OUT");
	firebase.auth().signOut();
}

function deleteAccount() {
	var user = firebase.auth().currentUser;

	Swal({
	  title: 'Are you sure?',
	  text: "You won't be able to revert this!",
	  type: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  confirmButtonText: 'Yes, delete it!'
	}).then((result) => {
	  if (result.value) {
  		user.delete().then(function() {
	  	    Swal(
		      'Deleted!',
		      'Your Account has been deleted.',
		      'success'
		    )
		})
	  }
	});
}

function postComment(article) {
	var user = firebase.auth().currentUser;
	var todayDate = new Date().toISOString('en-US', { timeZone: 'America/New_York' }).slice(0,10);
	var test = todayDate.slice(-1, -1);
	var databaseRef = firebase.database().ref().child("Comments" + '/' + article);

	if(user.displayName != null) {
		var username = user.displayName;
	} else {
		if(window.location.href.indexOf("womensRights-SaudiaArabia") > -1){
			let length = document.getElementById("womensRights-SaudiaArabia-name").innerHTML.length;
			var username = document.getElementById("womensRights-SaudiaArabia-name").innerHTML.slice(6, length);
		} else if(window.location.href.indexOf("christiansEgypt") > -1) {
			let length = document.getElementById("christiansEgypt-name").innerHTML.length;
			var username = document.getElementById("christiansEgypt-name").innerHTML.slice(6, length);
		} else if(window.location.href.indexOf("guanBay") > -1) {
			let length = document.getElementById("guanBay-name").innerHTML.length;
			var username = document.getElementById("guanBay-name").innerHTML.slice(6, length);
		}
	}

	if(window.location.href.indexOf("womensRights-SaudiaArabia") > -1){
		var message = document.getElementById("comment-womensRights-SaudiaArabia").value;
	} else if(window.location.href.indexOf("christiansEgypt") > -1) {
		var message = document.getElementById("comment-christiansEgypt").value;
	} else if(window.location.href.indexOf("guanBay") > -1) {
		var message = document.getElementById("comment-guanBay").value;
	}

	databaseRef.push({
		timestamp: todayDate,
		username: username,
		message: message
	})
	$("#comments-" + article).empty();

	databaseRef.on('child_added', snap => {
		var message = snap.child("message").val();
		var username = snap.child("username").val();
		var timestamp = snap.child("timestamp").val();
		
		$("#comments-" + article).append(
           	"<div class='div-comment'>"
           	+	"<h5 style='display: inline;'>" + username + "</h5>"
           	+ "<p style='display: inline; float: right; padding: 2px; padding-left: 1%;' onclick='editComment()'>Edit</p>"
           	+ "<p style='display: inline; float: right; padding: 2px; padding-left: 1%;' onclick='deleteComment()'>Delete</p>"
           	+ "<p style='display: inline; float: right; padding: 2px; padding-left: 1%;' onclick='reportComment()'>Report</p><br>"
           	+ "<p style='display: inline;'>" + timestamp + "</p><br><br><br>"
           	+ "<p style='display: inline; width: 90%;'>" + message + "</p>"
           	+ "</div><br>"
       	);		
	});

	if(window.location.href.indexOf("womensRights-SaudiaArabia") > -1){
		document.getElementById("comment-womensRights-SaudiaArabia").value = "";
	} else if (window.location.href.indexOf("christiansEgypt") > -1) {
		document.getElementById("comment-christiansEgypt").value = "";
	} else if (window.location.href.indexOf("guanBay") > -1) {
		document.getElementById("comment-guanBay").value = "";
	}
}

function editComment() {
	alert('The edit button currently has no function. Sorry!')
}

function deleteComment() {
	alert('The delete button currently has no function. Sorry!')
}

function reportComment() {
	alert('The report button currently has no function. Sorry!')
}

function onScroll() {
	var navbar = document.getElementById("navigation");
	var sticky = navbar.offsetTop;
	if(window.pageYOffset > sticky) {
		navbar.classList.add("navigationScroll");
		//console.log(navbar.classList)
	} else {
		navbar.classList.remove("navigationScroll");
	}
}

function displayHeader(name) {
	$("#" + name).fadeIn().css("transition","all 1s");
	$("#" + name).fadeIn().css("opacity","1");
}

function undisplayHeader(name) {
	$("#" + name).fadeIn().css("opacity","0");
}

function convertBin(input) {
	var output = ''
	for (var i = 0; i < input.length; i++) {
	  output += input[i].charCodeAt(0).toString(2) + " ";
	}
	return output
}

function convertHex(input) {
	var output = '';
	output += 'h9';
	output += parseInt(input, 2).toString(16).toUpperCase();
	output += '3b';
	return output
}

function postArticle() {
	var title = document.getElementById("postArticle-title").value;
	var author = document.getElementById("postArticle-auth").value;
	var img = document.getElementById("postArticle-img").value;
	var body = document.getElementById("postArticle-body").value;

	var article = document.implementation.createHTMLDocument("Test");

	console.log(title)
}
