'use strict';

$(document).ready( () =>
{
	$('select#device, input#camera').each( function(i)
	{
		let x = $(this).attr('id');
		let y = localStorage.getItem(x);
		if (y) $(this).val(y);
	});

	$('select#device, input#camera').change( function()
	{
		let x  = $(this).attr('id');
		let y = $(this).val();
		localStorage.setItem(x, y);

		connection.refresh;
	});

	$('button#capture, button#view').click(tab_role);
	$('button#close').click(logout);
	$('body').on('click', 'div.thumbnail', click_thumbnail)

	$.getJSON('user.php', get_user); // goes to tab_role
});

function tab_role()
{
	let on = 'text-muted bg-white', off = 'text-white bg-primary';

	$('button#capture, button#view').removeClass(on).addClass(off);
	$(this).removeClass(off).addClass(on);

	$('div#settings').toggle(this.id === 'capture');
	$('div#thumbnails').toggleFlex(this.id === 'view');

	localStorage.setItem('tab', this.id);

	pre_connect();
}

function pre_connect()
{
	let role 	= localStorage.getItem('tab');
	let room 	= $('email').text();
	let camera 	= $('input#camera').val();
	let device 	= $('select#device').val();

	connnect(room, role, camera, device);
}

function new_thumbnail(config, stream)
{
	let thumbnail = document.createElement('div');
	$(thumbnail).attr('id', config.id);
	$(thumbnail).addClass('thumbnail');
	$('#thumbnails').append(thumbnail);

	let video = new_video(stream);
	$(thumbnail).append(video);

	let label = document.createElement('div');
	$(label).html(config.title);
	$(label).addClass('label');
	$(thumbnail).append(label);

	$(thumbnail).click();
}

function del_thumbnail(id)
{
	if (window.selected_thumbnail == id) 
		$('div#thumbnails div').first().click();

	$('div#' + id).remove();
}

function click_thumbnail()
{
	window.selected_thumbnail = this.id;

	$('div#thumbnails .thumbnail').css('box-shadow', 'none');
	$(this).css('box-shadow', '0px 0px 2px 2px #007bff');

	let stream = $('#' + this.id + ' video')[0].srcObject;
	let video  = new_video(stream);
	$('div#mainvideo').empty();
	$('div#mainvideo').append(video);
};

function new_video(stream)
{
	let video = document.createElement('video');
	video.srcObject = stream;
	video.setAttribute('autoplay', true);
	video.setAttribute('playsinline', true);
	$(video).addClass('video');

	return video;
}

function get_user(data)
{
	if (!data) return;

	$('button#user').html(data.email.split('@')[0]);

	$('div#user-menu name').html(data.name);
	$('div#user-menu email').html(data.email);
	$('div#user-menu input#origen').val(data.origin);
	if (data.pic) $('div#user-menu img').attr('src', data.pic);

	let tab = localStorage.getItem('tab') || 'capture';
	$('#' + tab).click();
}
