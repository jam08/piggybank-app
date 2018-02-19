const firebase = require("nativescript-plugin-firebase");
var page;

exports.loaded = function(args) {
  page = args.object;
  //page.bindingContext = user;
  //firebase.getCurrentUser()
   // .then(user => console.log("User uid: " + user.uid))
   // .catch(error => console.log("Trouble in paradise: " + error));
}