// Varulv
// Kim Høg
// vimeo.com/kimhg
// 17/05-2018


//Stores starting date in milliseconds
var startingDate = Date.parse("September 01, 2018");



// Karakterdata
var navn;
var pinkode;
var rolle;
var uniqueNumber;

// Keep list of DOM elements for clearing later when reloading
var listItems = [];
var database;

function setup() {

    var config = {
        apiKey: "AIzaSyAGJdCvYXSudM_OZQd2N0bgDDkIbzuXZxs",
        authDomain: "varulv-af491.firebaseapp.com",
        databaseURL: "https://varulv-af491.firebaseio.com",
        projectId: "varulv-af491",
        storageBucket: "varulv-af491.appspot.com",
        messagingSenderId: "453345819256"
    };
    firebase.initializeApp(config);
    database = firebase.database();
    
    // Start loading the data
    loadFirebase();
    
    
    //tilmelding();
}

//Gameplay
function tilmelding() {
    createP("Navn (helst dit eget):");
    nameInput = createInput();
    createP("Vælg en pinkode:");
    pinInput = createInput('', 'password');
    createP("");
    tilmeldKnap = createButton('Tilmeld');
    tilmeldKnap.mousePressed(addPlayer);
}


//Help methods
function addPlayer() {
    var players = database.ref('players');

    // Make an object with data in it
    var data = {
        name: nameInput.value(),
        pin: pinInput.value(),
    }

        var player = players.push(data, finished);
        console.log("Firebase generated key: " + player.key);

        // Reload the data for the page
        function finished(err) {
        if (err) {
          console.log("ooops, something went wrong.");
          console.log(err);
        } else {
          console.log("Data saved successfully.");
        }
    }
}

function assignRoles() {
    var roller = [[41*43, 37*47, 31*53, 29*59, 23*61, 19*67, 17*71, 13*73, 13*79, 11*83, 7*89, 5*97, 37*43],
                   "va",  "sy",  "am",  "he",  "pi",  "va",  "bo",  "va",  "bo",  "va",  "bo", "bo", "bo"]
    var players = {
        
    }
}

function loadFirebase() {
  var ref = database.ref("fruits");
  ref.on("value", gotData, errData);
}

function errData(error) {
  console.log("Something went wrong.");
  console.log(error);
}

// The data comes back as an object
function gotData(data) {
  var fruits = data.val();
  // Grab all the keys to iterate over the object
  var keys = Object.keys(fruits);

  // clear previous HTML list
  clearList();

  // Make an HTML list
  var list = createElement('ol');
  list.parent('data');

  // Loop through array
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var fruit = fruits[key];
    var li = createElement('li', fruit.fruit + ': ' + fruit.total + ", key: " + key);
    li.parent(list);
    listItems.push(li);
  }
}

// Clear everything
function clearList() {
  for (var i = 0; i < listItems.length; i++) {
    listItems[i].remove();
  }
}

// This is a function for sending data
function sendToFirebase() {
  var fruits = database.ref('fruits');

  // Make an object with data in it
  var data = {
    fruit: fruitInput.value(),
    total: totalInput.value()
  }

  var fruit = fruits.push(data, finished);
  console.log("Firebase generated key: " + fruit.key);

  // Reload the data for the page
  function finished(err) {
    if (err) {
      console.log("ooops, something went wrong.");
      console.log(err);
    } else {
      console.log('Data saved successfully');
    }
  }
}
