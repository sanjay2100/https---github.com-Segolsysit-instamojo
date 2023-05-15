function buythiscourses() {
    // var rzp1 = new Razorpay(options);sss
    const login = sessionStorage.getItem("advuser")

    if (login === null) {
        window.location = "register.html"
    }
    else {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // var userEmail = user.email;
                var usersRef = firebase.database().ref("course 1");
                usersRef.orderByChild("email").equalTo(userEmail).once("value", function (snapshot) {
                    if (snapshot.exists()) {
                        console.log("Email exists in the database");
                        alert("you already pay for this course ")
                        window.location = "course-watch.html"

                    }
                    else {
                        window.location = "advanced-student-watch.html"
                    }
                });
            }
        });
    }

}