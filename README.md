This library depends on PeerJS, including it with the following script tag added to your HTML:
```html
<script src="https://unpkg.com/peerjs@1.3.2/dist/peerjs.min.js" crossorigin="anonymous"></script>
```

## Including PeerRooms
Include PeerRooms in your project using the following script tag:
```html
<script src="https://cdn.jsdelivr.net/gh/jeremyglebe/PeerRooms@master/PeerRooms.js" crossorigin="anonymous"></script>
```

PeerRooms adds the following functions which you can use to interact with rooms:
 * **prConnect(options?)**: Establish a connection to a brokering server, needed to find peers. (Options are options for the **peerjs** constructor)
 * **prCreateRoom()**: Create a room and mark yourself as the host
 * **prJoinRoom(roomID)**: Join a room using the ID of the peer hosting it
 * **prBroadcast(data)**: Broadcast a message to all the peers in your room
 * **prIsHost(peerID?)**: Check if a peer is the host of the room. If no ID is provided, you are checking if *you* are the host of the room.

PeerRooms will search for the following functions to be defined as listeners for events:
 * **prSelfJoined()**: Runs when you join or create a room
 * **prOtherJoined(dataconn)**: Runs when another player joins your room. Provides their **peerjs DataConnection** object. 
 * **prMessageReceived(peerID, data)**: Runs when another player sends or broadcasts a message. Provides their ID and the data they sent.
 * **prPeerListReceived(others)**: Runs when you initially receive a list of peers. Provides a list of peer IDs.

PeerRooms also provides access to the following global variables:
 * **prSelf**: the peerjs instance - represents your connection to the brokering server
 * **prHostID**: the ID of the room host - null until in a room
 * **prOthers**: an object mapping peer IDs to data connections

## Adding UI Elements
Include an optional pre-built UI for PeerRooms using the following script tag:
```html
<script src="https://cdn.jsdelivr.net/gh/jeremyglebe/PeerRooms@master/PeerRoomsUI.js" crossorigin="anonymous"></script>
```

The UI extension adds the following functions:
 * **prShowMenu()**: shows the connection menu (or the room ID, if already connected)
 * **prHideMenu()**: hides the connection menu
