const frameModule = require("ui/frame");
const firebase = require("nativescript-plugin-firebase");
const observableModule = require("data/observable");

const topmost = frameModule.topmost();

const user = new observableModule.fromObject({
    email: "email@email.com",
    password: ""
});

var page;

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = user;

  firebase.getCurrentUser()
    .then((user) => {
      const navigationEntry = {
        moduleName: "views/dashboard/dashboard",
        context: {user: user.uid},
        animated: false
      }
      const topmost = frameModule.topmost();
      topmost.navigate(navigationEntry)
    })
    .catch(error => console.log("trouble: " + error));
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
          console.log(response);
        })
        .catch(error => console.log(error));
    }
    alert(user.email);
};

exports.register = function() {
    const topmost = frameModule.topmost();
    topmost.navigate("views/register/register");
};

exports.reset = function() {
    alert('Damn, I forgot!');
};