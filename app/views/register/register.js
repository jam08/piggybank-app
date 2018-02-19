const firebase = require("nativescript-plugin-firebase");

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
    firebase.createUser(
      {
        email: newUser.email,
        password: newUser.password
      })
      .then(result => console.log("userid: " + result.key))
      .catch(error => console.log(error));
    firebase.push('/users', newUser)
      .then(
        function(result) {
          console.log("created key: " + result.key);
        }
      );
    alert("Account created");
  }
};