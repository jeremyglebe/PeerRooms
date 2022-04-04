function setup() {
    // Create a canvas that covers the full window
    createCanvas(windowWidth, windowHeight);
    prConnect();
    prShowMenu();
}

function draw() {
    // Clear the previous frame
    clear()
    // Draw the background color (red, green, blue)
    background(200, 225, 255);
}

function prSelfJoined(){
    setTimeout(prShowMenu, 50);
}