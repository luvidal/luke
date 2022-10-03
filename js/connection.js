
let connection = new RTCMultiConnection();

connection.DetectRTC.load( function() 
{
	let n = connection.DetectRTC.videoInputDevices.length;
	if (!n) return alert('No camera was found');

    connection.DetectRTC.videoInputDevices.forEach( function(device)
	{
		$('#device').append($('<option>', { value:device.id, text:device.label }));
    });
});

connection.onstream = onstream;
connection.onstreamended = ev => del_thumbnail(ev.userid);

function connnect(room, role, label, device)
{
	let ice1, ice2;
	ice1 = { urls:'turn:numb.viagenie.ca', username:'luvidal@edictus.com', credential:'qwerty123' }
	ice2 = { urls:'stun:stun2.l.google.com:19302' }

	connection.socketURL  = 'https://rtc.edictus.com/';
	connection.iceServers = [ ice1, ice2 ];
	//connection.codecs.video = 'VP8';

	connection.extra.label = label;
	connection.extra.role  = role;

	connection.session = { audio:false, video:true }
	connection.mediaConstraints = { video:{ deviceId:device, width:640, height:480 } }

	connection.openOrJoin(room);  
}

connection.refresh = function(ev)
{
	connection.close();
	connection.closeSocket();

	connection = new RTCMultiConnection();
	connection.onstream = onstream;

	pre_connect();
}

function onstream(ev)
{
	del_thumbnail(ev.userid);
	let config = { id:ev.userid, title:ev.extra.label }
	new_thumbnail(config, ev.stream);
}
