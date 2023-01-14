/**
 * This file contains a very simple and not altogether good UI for PeerRooms.
 * It is a simple way to test PeerRooms if needed and is plain javascript.
 * Functions for use:
 * prShowMenu()
 * prHideMenu()
 */

// This variable tracks whether the menu has been added to the DOM yet
var _prMenuAdded = false;
// This div element is the container for the menu items
var _prMenu = document.createElement('div');

/** Function that shows the PeerRooms menu */
function prShowMenu() {
    if (!_prMenuAdded) {
        document.body.appendChild(_prMenu);
    }
    _prMenu.hidden = false;
}

/** Function that hides the PeerRooms menu */
function prHideMenu() {
    _prMenu.hidden = true;
}

function _prMenuScreenID() {
    _prMenuPrompt.textContent = `My Room ID: ${prHostID}`;
    _prMenu.removeChild(_prMenuInput);
    _prMenu.removeChild(_prMenuJoinBtn);
    _prMenu.removeChild(_prMenuCreateBtn);
    _prMenuPrompt.style.marginBottom = '25%';
}

function _prMenuOnCreate() {
    prCreateRoom();
    prHideMenu();
    _prMenuScreenID();
}

function _prMenuOnJoin() {
    prJoinRoom(_prMenuInput.value);
    prHideMenu();
    _prMenuScreenID();
}

// Styling the menu and then initially hiding it
Object.assign(_prMenu.style, {
    width: '80%',
    position: 'absolute',
    left: '10%',
    bottom: '10%',
    backgroundColor: 'black',
    borderRadius: "25px",
    borderStyle: "solid",
    borderColor: 'lightgray',
    borderWidth: "15px",
    textAlign: 'center'
});
_prMenu.hidden = true;

// Some shared style between the menu items
const _prMenuItemStyle = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '5%'
}

// Style of create room button
var _prMenuCreateBtn = document.createElement('button');
Object.assign(_prMenuCreateBtn.style, _prMenuItemStyle);
_prMenuCreateBtn.style.height = '10vh';
_prMenuCreateBtn.style.fontSize = "3vh";
_prMenuCreateBtn.textContent = "Create a Room";
// Functionality
_prMenuCreateBtn.onclick = _prMenuOnCreate;
// Add create room button to menu
_prMenu.appendChild(_prMenuCreateBtn);

var _prMenuPrompt = document.createElement('div');
Object.assign(_prMenuPrompt.style, _prMenuItemStyle);
_prMenuPrompt.style.width = '80%';
_prMenuPrompt.style.height = '3vh';
_prMenuPrompt.style.fontSize = "3vh";
_prMenuPrompt.style.color = 'white';
_prMenuPrompt.textContent = "OR Enter a Room ID";
_prMenu.appendChild(_prMenuPrompt);

var _prMenuInput = document.createElement('input');
Object.assign(_prMenuInput.style, _prMenuItemStyle);
_prMenuInput.style.width = '80%';
_prMenuInput.style.height = '10vh';
_prMenuInput.style.fontSize = "3vh";
_prMenu.appendChild(_prMenuInput);

// Style of join room button
var _prMenuJoinBtn = document.createElement('button');
Object.assign(_prMenuJoinBtn.style, _prMenuItemStyle);
_prMenuJoinBtn.style.marginBottom = '5%';
_prMenuJoinBtn.style.height = '10vh';
_prMenuJoinBtn.style.fontSize = "3vh";
_prMenuJoinBtn.textContent = "Join Room by ID";
// Functionality
_prMenuJoinBtn.onclick = _prMenuOnJoin;
// Add create room button to menu
_prMenu.appendChild(_prMenuJoinBtn);
