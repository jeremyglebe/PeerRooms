let colorlist = ['gold', 'yellow', 'turquoise', 'red']

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
}

function draw() {
    noStroke()
    fill(random(colorlist));
    ellipse(mouseX, mouseY, 25, 25);
}

function keyPressed() {
    // if (key == 'c') {
    //     prCreateRoom();
    //     console.log("My Room ID: ", prBossID);
    // }
    // else if (key == 'j') {
    //     prJoinRoom(prompt("Room ID? "));
    // }
    if (key == 'b') {
        prBroadcast(`Hi! My name is ${prSelf.id}`);
    }
    else if (key == "="){
        prShowMenu();
    }
    else if (key == '-'){
        prHideMenu();
    }
}

function prSelfJoined() {
    console.log(`Joined room successfully!`);
    if (!prIsBoss())
        prOthers[prBossID].send("Hi boss!");
}

function prOtherJoined(dataconn) {
    console.log(`${dataconn.peer} joined!`);
}

function prMessageReceived(peerID, data) {
    console.log(`${peerID}> ${data}`);
}

function prPeerListReceived(others) {
    console.log(`Peers in this room: ${others}`);
}