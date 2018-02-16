var frameModule = require("ui/frame");

var observableModule = require("data/observable");
var user = new observableModule.fromObject({
    email: "email@email.com",
    password: ""
});
var page;

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = user;
}
exports.signIn = function() {
    if (!user.email || !user.password) {
        alert("Please provide both an email address and password.");
        return;
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