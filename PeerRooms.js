/**
 * Global action functions to perform room related commands
 * prConnect(options?)
 * prCreateRoom()
 * prJoinRoom(roomID)
 * prBroadcast(data)
 * prIsHost(peerID?)
 * 
 * Global event functions to implement in your script
 * prSelfJoined()
 * prOtherJoined(dataconn)
 * prMessageReceived(peerID, data)
 * prPeerListReceived(others)
 */

var prSelf = null;
var prHostID = null;
var prOthers = {};

function prConnect(options) {
    prSelf = new Peer(undefined, options);
    prHostID = null;
    prOthers = {};

    // Handle connections from other peers
    prSelf.on('connection', function (dataconn) {
        // Add the new peer to others
        prOthers[dataconn.peer] = dataconn;
        setTimeout(()=>{
        }, 1000);
        // If a callback is defined globally, run it
        if (typeof prOtherJoined === 'function') {
            prOtherJoined(dataconn);
        }
        // If I am the boss, then I should share the list of peers
        if (prIsHost()) {
            setTimeout(() => {
                dataconn.send({
                    type: "peer list",
                    peers: Object.keys(prOthers)
                });
            }, 1000);
        }
        // When data is received from a peer
        dataconn.on('data', function (data) {
            _prOnData(dataconn, data);
        });
    });
}

function prCreateRoom() {
    // Set yourself as the boss
    prHostID = prSelf.id;
    // Check if a global callback is defined
    if (typeof prSelfJoined === 'function') {
        prSelfJoined();
    }
}

function prJoinRoom(roomID) {
    prHostID = roomID;
    prOthers[prHostID] = prSelf.connect(roomID);
    // Behavior upon successful connection
    prOthers[prHostID].on('open', function () {
        // Check if a global callback is defined
        if (typeof prSelfJoined === 'function') {
            prSelfJoined();
        }
    });
    // When data is received from a peer
    prOthers[prHostID].on('data', function (data) {
        _prOnData(prOthers[prHostID], data);
    });
}

function prBroadcast(data) {
    for (let peer of Object.values(prOthers)) {
        peer.send(data);
    }
}

function prIsHost(peerID) {
    const id = peerID || prSelf.id;
    return id == prHostID;
}

function _prOnData(dataconn, data) {
    if (data.type == "peer list" && prIsHost(dataconn.peer)) {
        for (let peer of data.peers) {
            if (peer != prSelf.id){
                prOthers[peer] = prSelf.connect(peer);
                prOthers[peer].on('data', function (data) {
                    _prOnData(prOthers[peer], data);
                });
            }
        }
        if (typeof prPeerListReceived === 'function') {
            prPeerListReceived(Object.keys(prOthers));
        }
    }
    else if (typeof prMessageReceived === 'function') {
        prMessageReceived(dataconn.peer, data);
    }
}