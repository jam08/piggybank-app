const frameModule = require("ui/frame");
const firebase = require("nativescript-plugin-firebase");
const observableModule = require("data/observable");

const topmost = frameModule.topmost();

const user = new observableModule.fromObject({
    email: "email@email.com",
    password: ""
});

var page;
var isLoggedIn = true;

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = user;
  /* Have issues with firebase and keychain entitlements in iOS 
   * Hardcoded login so I can continue to work on the app.
   * Need to remove this later and uncomment the firebase.getCurrentUser().
   */
  /*
  if(isLoggedIn) {
    const navigationEntry = {
      moduleName: "views/dashboard/dashboard",
      context: {user: "Janaina"},
      animated: false
    }
    const topmost = frameModule.topmost();
    topmost.navigate(navigationEntry)
  }*/
  ///*
  firebase.getCurrentUser()
    .then((user) => {
      const navigationEntry = {
        moduleName: "views/dashboard/dashboard",
        context: {user: user.email},
        animated: false
      }
      const topmost = frameModule.topmost();
      topmost.navigate(navigationEntry)
    })
    .catch(error => console.log("trouble: " + error));
    //*/
}
exports.signIn = function() {
  if (!user.email || !user.password) {
    alert("Please provide both an email address and password.");
  }else {
    firebase.login(
      {
        type: firebase.LoginType.PASSWORD,
        passwordOptions: {
          email: user.email,
          password: user.password
        }
      })
        .then((result) => {
          const topmost = frameModule.topmost();
          topmost.navigate("views/dashboard/dashboard");
          const response = JSON.stringify(result);
          //console.log(response);
        })
        .catch(error => console.log(error));
    }
    //alert(user.email);
};

exports.register = function() {
    const topmost = frameModule.topmost();
    topmost.navigate("views/register/register");
};

exports.reset = function() {
    alert('Damn, I forgot!');
};