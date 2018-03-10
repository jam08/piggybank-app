const firebase = require("nativescript-plugin-firebase");
var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var topmost = require("ui/frame").topmost();

var pageData = new observableModule.fromObject({
  children: new ObservableArray([
  ])
});

let userKey;
let userChildren;

var getUserKey = function(email) {
  firebase.query(
    function(result) {
      const user = result.value;
      let childrenArray;
      for(const key in user) {
        userKey = key;
        childrenArray = user[key].children;
      }
      userChildren = childrenArray;
      //console.log("userChildren: " +  userChildren);
      getChildren(userChildren);
    },
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

var getChildren = function (childrenArray) {

  //console.log("result getChildren: " + childrenArray);
  let count = 0;
  childrenArray.map((key) => {
      //console.log("duh" + key);
      firebase.query(
        function(result) {
          const child = result.value;
          for(const key in child) {
           let childObj = {
              image: "res://pygge3x",
              name: child[key].name,
              balance: child[key].balance,
              cid: key
            }
            let data = pageData.get("children");
            data.setItem(count, childObj);
            count++;
          }
        },
        "/children",
        {
          singleEvent: true,
          orderBy: {
          type: firebase.QueryOrderByType.KEY
          }, 
          range: {
            type: firebase.QueryRangeType.EQUAL_TO,
            value: key
          }
        }
      );
    }
  );
}

exports.loaded = function loaded(args) {
  const page = args.object; 
  page.bindingContext = pageData;
  /* Get current user's email */
  firebase.getCurrentUser()
    .then(user => getUserKey(user.email))
    .catch(error => console.log("trouble: " + error));
}

exports.addChild = function() {
  const navigationEntry = {
    moduleName: "views/newChild/newChild",
    context: {userKey: userKey, children: userChildren},
    animated: false
  }
  topmost.navigate(navigationEntry);
}

exports.onItemTap = function(eventData) {
  let viewId = eventData.view.id;
  let data = pageData.get("children");
  let child = data.filter((child) => {
    return child.cid === viewId;
  });
  let childInfo = child[0];
  const navigationEntry = {
    moduleName: "views/childProfile/childProfile",
    context: { childInfo: childInfo },
    animated: false
  }
  topmost.navigate(navigationEntry);
}

exports.logout = function() {
  firebase.logout();
  topmost.navigate("views/login/login");
}