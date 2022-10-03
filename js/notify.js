'use strict';

$.notifyDefaults(
{
	element:'content',
	//template:$('#template-notify').html(),
	placement:{ from:'bottom', align:'right' },
	//animate:{ enter:'animated fadeInDown', exit:'animated fadeOutUp' },
	//delay:-1,
});

function notification(id)
{
	let icon, title, message, type;

	switch(id)
	{
		case 'no-support' :

			icon 	= 'fas fa-exclamation-triangle';
			title 	= 'Wrong Browser';
			message = 'This browser doesn´t support video media.';
			type 	= 'danger';
			break;

		case 'no-camera' :

			icon 	= 'fas fa-exclamation-triangle';
			title 	= 'No Camera';
			message = 'No camera was found in this device';
			type 	= 'danger';
			break;

		case 'no-role' :

			icon 	= 'fas fa-exclamation-triangle';
			title 	= 'No Device Role';
			message = 'Set up this device to enable this feature.';
			type 	= 'danger';
			break;

		case 'in-tutorial' :

			icon 	= 'fas fa-info-circle';
			title 	= 'Remember';
			message = 'You can go back through the Main Menu.';
			type 	= 'info';
			break;

		default :

			return console.log(id + ' not found!');
	}

	$.notify({ icon:icon, title:title, message:message }, { type:type });
}

function bootrap2icon(bclass)
{
	let icon;
	switch(bclass)
	{
		case 'success'	: icon = 'fa-thumbs-up'; break;
		case 'danger'	: icon = 'fa-exclamation-triangle'; break;
		case 'info'		: icon = 'fa-info'; break;
	}

	return icon;
}