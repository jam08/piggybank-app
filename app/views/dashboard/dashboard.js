//const firebase = require("nativescript-plugin-firebase");

var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;

var pageData = new observableModule.fromObject({
  children: new ObservableArray([
  { image: "res://pygge3x", name: "JOSHUA", cash: "50kr" },
  { image: "res://pygge3x", name: "SIENA", cash: "50kr" }
  ])
});
var page;

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = pageData;
}

/*
exports.addChild = function() {
  const newChild = {
    name: "Joshua",
    image: "res://pygge3x",
    cash: "50kr"
  }
  childrenArr.push(newChild);

} */