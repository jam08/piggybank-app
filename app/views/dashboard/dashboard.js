const firebase = require("nativescript-plugin-firebase");
var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();

var pageData = new observableModule.fromObject({
  children: new ObservableArray([
  { image: "res://pygge3x", name: "JOSHUA", cash: "50kr" },
  { image: "res://pygge3x", name: "SIENA", cash: "50kr" }
  ])
});

var onQueryEvent = function(result) {
  // note that the query returns 1 match at a time
  // in the order specified in the query
  if (!result.error) {
      console.log("Event type: " + result.type);
      console.log("Key: " + result.key);
      console.log("Value: " + JSON.stringify(result.value));
  }else {
    console.log(result.error);
  }
};

var getChildren = function(email) {
  firebase.query(
    onQueryEvent,
    "/users",
    {
      // checks if the value exists or the event fires once
      singleEvent: true,
      orderBy: {
        type: firebase.QueryOrderByType.CHILD,
        value: "email"
      },
      range: {
        type: firebase.QueryRangeType.EQUAL_TO,
        value: email
      }
    }
  );
}

exports.loaded = function loaded(args) {
  const page = args.object; 
 
  //const child = pageData.get(children.name);
  const arr = pageData.get("children");
  arr.map(child => console.log(child.name));
  page.bindingContext = pageData;
  /* Get current user's email */
  /*firebase.getCurrentUser()
    .then(user => getChildren(user.email))
    .catch(error => console.log("trouble: " + error));*/

  
}

exports.addChild = function() {
  topmost.navigate("views/newChild/newChild");
}