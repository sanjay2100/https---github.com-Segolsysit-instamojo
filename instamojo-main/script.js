const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCVj7bifzfFIvDW1uBMFiWU2CnJEkHgS2Q",
  authDomain: "database-e7808.firebaseapp.com",
  projectId: "database-e7808",
  storageBucket: "database-e7808.appspot.com",
  messagingSenderId: "806749812012",
  appId: "1:806749812012:web:4438f4f7efe27b5d1ba889"
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
var database = firebase.database();
var firebaseRef = firebase.database().ref('data')

// let a = 600;
// var options = {
//   "key": "rzp_test_FjtqgTIsWBgXxV", // Enter the Key ID generated from the Dashboard
//   "amount": a * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//   "currency": "INR",
//   "name": "Acme Corp", //your business name
//   "description": "Test Transaction",
//   "image": "https://example.com/your_logo",
//   // "order_id": "rzp_test_FjtqgTIsWBgXxV", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//   "callback_url": "index.html",
//   "prefill": {
//     "name": "Gaurav Kumar", //your customer's name
//     "email": "gaurav.kumar@example.com",
//     "contact": "9000090000"
//   },
//   "notes": {
//     "address": "Razorpay Corporate Office"
//   },
//   "theme": {
//     "color": "#3399cc"
//   }
// };
// var rzp1 = new Razorpay(options);
// rzp1.open();

function signup() {

  const email = document.getElementById('reg_email').value;
  const password = document.getElementById('reg_pass').value;
  const username = document.getElementById('user').value
  var firebase1Ref = firebase.database().ref('register-data')
  var register_data ={
    email:email,
    username:username
  }
  console.log(email, password);
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      firebase1Ref.push(register_data)
      alert("you signed up");
      window.location.href = "login.html";
      console.log(result);
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
      // ..
    });
}

// signin function


function signIn() {
  // const username = document.getElementById('userlog').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('pass').value;
  // firebase.auth().onAuthStateChanged(function(user) {
  //   if (user) {
  //     // User is signed in, store their user ID in the active node
  //     firebase.database().ref('/users/' + user.uid + '/active').set(true);
  //   } else {
  //     // User is signed out, remove their user ID from the active node
  //     firebase.database().ref('/users/' + user.uid + '/active').remove();
  //   }
  // });

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function() {
    // User signed in successfully, check if they already have an active session
    // var userId = userCredential.user.uid;
      localStorage.setItem("email", email);
      firebase.auth().onAuthStateChanged(function (user) {
        var username = user.username;
        sessionStorage.setItem("user",username)
        // const currentUser = firebase.auth().currentUser;
        var userId = user.uid;
        firebase.database().ref('/users/' + userId + '/active').once('value')
          .then(function(snapshot) {
            if (snapshot.exists()) {
              // User already has an active session, deny login
              firebase.auth().signOut().then(function() {
                alert('You are already logged in on another device');
              });
            } else {
              let firebaseref  =firebase.database().ref('/users/' + user.uid + '/active').set(true);
              const itemref = firebase.database().ref('users/' + firebaseref.key)
              localStorage.setItem("keyid",firebase.key)
              localStorage.setItem("firebasekey",user.uid)
              
              // User does not have an active session, allow login
              window.location="course-student.html"
            }
          });
      });
    }).catch(function(error) {
      // Handle login error
      console.error(error);
    });
}

// forgot password

function forgotpassword() {
  const email = document.getElementById('forgpass').value;

  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      console.log("sfdvghjk");
      alert('Reset link is send to your Email')
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorCode)
      console.log(errorCode);
      console.log(errorMessage);
      console.log(email);
      // ..
    });
}

function logout() {
  var key = localStorage.getItem("firebasekey")
  var key1 = localStorage.getItem("keyid")
  const itemRef = firebase.database().ref('users/' + key+ '/active')
  itemRef.remove().then(()=>{
    window.location.href = "login.html";
})
  console.log(key);
  firebase.auth().signOut().then(function(){
      // Sign-out successful.

      localStorage.removeItem("email");
      sessionStorage.removeItem('user')
      localStorage.removeItem("firebasekey")
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
}

// Helper function to get the device identifier
function getDeviceIdentifier() {
  
  // Implement your own device identification logic here, such as using a browser fingerprint library or generating a unique ID and storing it in local storage
  // return 'example-device-identifier';
  let deviceIdentifier = localStorage.getItem('deviceIdentifier'); // Check if device identifier is already stored in local storage
  if (!deviceIdentifier) { // If not, generate a new one
    const navigatorInfo = window.navigator;
    const screenInfo = window.screen;
    const random = Math.random();
    deviceIdentifier = `${navigatorInfo.userAgent}${navigatorInfo.language}${screenInfo.width}${screenInfo.height}${screenInfo.colorDepth}${random}`; // Combine device attributes and random number to generate the device identifier
    deviceIdentifier = btoa(deviceIdentifier).substr(0, 16); // Encode device identifier in base64 and take the first 16 characters
    localStorage.setItem('deviceIdentifier', deviceIdentifier); // Store the device identifier in local storage
  }
  return deviceIdentifier;
}

