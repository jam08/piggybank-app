const firebase = require("nativescript-plugin-firebase");
//console.dir(firebase.setValue);
var page;

exports.loaded = function(args) {
    page = args.object;
}

exports.signUp = function() {
  const invalidFields = [];
  const newUser = {
    firstName: page.getViewById("firstName").text,
    surname: page.getViewById("surname").text,
    email: page.getViewById("email").text,
    password: page.getViewById("password").text
  };

  for(const [key, value] of Object.entries(newUser)) {
    if(value === "") {
      invalidFields.push(key);
    }
  }

  if(invalidFields.length > 0) {
    invalidFields.map(field => {
      page.getViewById(field).style.borderBottomColor = "red";
    });
  }else {
    firebase.push('/users', newUser)
      .then(
        function (result) {
          console.log("created key: " + result.key);
        }
      );
    alert("Account created");
  }
  

    //firebase.setValue('/users', newUser);
};