/**
 * Global action functions to perform room related commands
 * prCreateRoom()
 * prJoinRoom(roomID)
 * prBroadcast(data)
 * prIsBoss(peerID?)
 * prShowMenu()
 * prHideMenu()
 * 
 * Global event functions to implement in your script
 * prSelfJoined()
 * prOtherJoined(dataconn)
 * prMessageReceived(peerID, data)
 * prPeerListReceived(others)
 */

var prSelf = new Peer();
var prBossID = null;
var prOthers = {};

// Handle connections from other peers
prSelf.on('connection', function (dataconn) {
    // Add the new peer to others
    prOthers[dataconn.peer] = dataconn;
    // If a callback is defined globally, run it
    if (typeof prOtherJoined === 'function') {
        prOtherJoined(dataconn);
    }
    // If I am the boss, then I should share the list of peers
    if (prIsBoss()) {
        setTimeout(() => {
            dataconn.send({
                type: "peer list",
                peers: Object.keys(prOthers)
            });
        }, 20);
    }
    // When data is received from a peer
    dataconn.on('data', function (data) {
        _prOnData(dataconn, data);
    });
});

function prCreateRoom() {
    // Set yourself as the boss
    prBossID = prSelf.id;
    // Check if a global callback is defined
    if (typeof prSelfJoined === 'function') {
        prSelfJoined();
    }
}

function prJoinRoom(roomID) {
    prBossID = roomID;
    prOthers[prBossID] = prSelf.connect(roomID);
    // Behavior upon successful connection
    prOthers[prBossID].on('open', function () {
        // Check if a global callback is defined
        if (typeof prSelfJoined === 'function') {
            prSelfJoined();
        }
    });
    // When data is received from a peer
    prOthers[prBossID].on('data', function (data) {
        _prOnData(prOthers[prBossID], data);
    });
}

function prBroadcast(data) {
    for (let peer of Object.values(prOthers)) {
        peer.send(data);
    }
}

function prIsBoss(peerID) {
    const id = peerID || prSelf.id;
    return id == prBossID;
}

function _prOnData(dataconn, data) {
    if (data.type == "peer list" && prIsBoss(dataconn.peer)) {
        for (let peer of data.peers) {
            if (peer != prSelf.id)
                prOthers[peer] = prSelf.connect(peer);
        }
        if (typeof prPeerListReceived === 'function') {
            prPeerListReceived(Object.keys(prOthers));
        }
    }
    else if (typeof prMessageReceived === 'function') {
        prMessageReceived(dataconn.peer, data);
    }
}

var prMenuAdded = false;
var _prMenu = document.createElement('div');
_prMenu.style.width = '80%';
_prMenu.style.position = 'absolute';
_prMenu.style.left = '10%';
_prMenu.style.top = '10%';
_prMenu.style.backgroundColor = 'black';
_prMenu.style.borderRadius = "25px";
_prMenu.style.borderStyle = "solid";
_prMenu.style.borderColor = 'lightgray';
_prMenu.style.borderWidth = "15px";
_prMenu.style.textAlign = 'center';
_prMenu.hidden = true;

// Style of create room button
var _prCreateRoomButton = document.createElement('button');
_prCreateRoomButton.style.display = 'block';
_prCreateRoomButton.style.marginLeft = 'auto';
_prCreateRoomButton.style.marginRight = 'auto';
_prCreateRoomButton.style.marginTop = '5%';
_prCreateRoomButton.style.height = '10vh';
_prCreateRoomButton.style.fontSize = "3vh";
_prCreateRoomButton.textContent = "Create a Room";
// Functionality
_prCreateRoomButton.onclick = function(){
    prCreateRoom();
    prHideMenu();
    _prRoomIDPrompt.textContent = `My Room ID: ${prBossID}`;
    _prMenu.removeChild(_prRoomIDInput);
    _prMenu.removeChild(_prJoinRoomButton);
    _prMenu.removeChild(_prCreateRoomButton);
    _prRoomIDPrompt.style.marginBottom = '25%';
}
// Add create room button to menu
_prMenu.appendChild(_prCreateRoomButton);

var _prRoomIDPrompt = document.createElement('div');
_prRoomIDPrompt.style.display = 'block';
_prRoomIDPrompt.style.marginLeft = 'auto';
_prRoomIDPrompt.style.marginRight = 'auto';
_prRoomIDPrompt.style.marginTop = '5%';
_prRoomIDPrompt.style.width = '80%';
_prRoomIDPrompt.style.height = '3vh';
_prRoomIDPrompt.style.fontSize = "3vh";
_prRoomIDPrompt.style.color = 'white';
_prRoomIDPrompt.textContent = "OR Enter a Room ID";
_prMenu.appendChild(_prRoomIDPrompt);

var _prRoomIDInput = document.createElement('input');
_prRoomIDInput.style.display = 'block';
_prRoomIDInput.style.marginLeft = 'auto';
_prRoomIDInput.style.marginRight = 'auto';
_prRoomIDInput.style.marginTop = '5%';
_prRoomIDInput.style.width = '80%';
_prRoomIDInput.style.height = '10vh';
_prRoomIDInput.style.fontSize = "3vh";
_prMenu.appendChild(_prRoomIDInput);

// Style of join room button
var _prJoinRoomButton = document.createElement('button');
_prJoinRoomButton.style.display = 'block';
_prJoinRoomButton.style.marginLeft = 'auto';
_prJoinRoomButton.style.marginRight = 'auto';
_prJoinRoomButton.style.marginTop = '5%';
_prJoinRoomButton.style.marginBottom = '5%';
_prJoinRoomButton.style.height = '10vh';
_prJoinRoomButton.style.fontSize = "3vh";
_prJoinRoomButton.textContent = "Join Room by ID";
// Functionality
_prJoinRoomButton.onclick = function(){
    prJoinRoom(_prRoomIDInput.value);
    prHideMenu();
    _prRoomIDPrompt.textContent = `My Room ID: ${prBossID}`;
    _prMenu.removeChild(_prRoomIDInput);
    _prMenu.removeChild(_prJoinRoomButton);
    _prMenu.removeChild(_prCreateRoomButton);
    _prRoomIDPrompt.style.marginBottom = '25%';
}
// Add create room button to menu
_prMenu.appendChild(_prJoinRoomButton);

function prShowMenu(){
    if(!prMenuAdded){
        document.body.appendChild(_prMenu);
    }
    _prMenu.hidden = false;
}

function prHideMenu(){
    _prMenu.hidden = true;
}