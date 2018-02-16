var observableModule = require("data/observable");
var user = new observableModule.fromObject({
    firstName: "First Name",
    surname: "Surname",
    email: "email@email.com",
    password: ""
});
var page;

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = user;
}

exports.signUp = function() {
    alert("hello, " + user.firstName);
};