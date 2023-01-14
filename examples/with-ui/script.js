function setup() {
    // Create a canvas that covers the full window
    createCanvas(windowWidth, windowHeight);
    prConnect();
    prShowMenu();
}

function draw() {
    // Clear the previous frame
    clear();
    // Draw the background color (red, green, blue)
    background(200, 225, 255);
}

function prSelfJoined() {
    setTimeout(prShowMenu, 50);
    setInterval(
        () => {
            // Broadcast a random letter a-z
            prBroadcast({
                type: "letter",
                letter: String.fromCharCode(Math.floor(Math.random() * 26) + 97),
            });
            console.log("sent");
        },
        // random number between 1 and 5 seconds
        Math.floor(Math.random() * 5000) + 1000
    );
}

function prMessageReceived(peerID, data) {
    if (data.type == "letter") console.log(`Received ${data.letter} from ${peerID}`);
    else console.log(`Received ${data.type} from ${peerID}`);
}

function prPeerListReceived(others) {
    console.log(`Received peer list: ${others}`);
}