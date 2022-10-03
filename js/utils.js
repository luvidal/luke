'use strict';

let app   = 'luke';
let path  = (location.hostname === 'localhost') ? `http://localhost/${app}` : `https://${app}.edictus.com`;
let login = `${path}/login.html`;

// --------------------------------------------------- AJAX -------------------------------------------------------------

$.ajaxSetup(
{
	beforeSend: xhr => { xhr.setRequestHeader('jwt', localStorage.getItem('jwt')); }
});

$.ajaxPrefilter( function(options)
{
    options.url = `${path}/server/${options.url}`;
});

$(document).ajaxError( function(ev, xhr, settings, err)
{
	if (xhr.status == 401) top.location = login;
});

// --------------------------------------------------- USER -------------------------------------------------------------

function oauth(provider)
{
	let oauth = (location.hostname === 'localhost') ? 'http://localhost/login' : 'https://login.edictus.com';
	top.location = `${oauth}/${provider}.php?source=${location.href}`;
}

function logout()
{
	localStorage.removeItem('jwt');

	let gurl = 'https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=' + login;
	let furl = 'https://www.facebook.com';

	switch ($('input#origen').val())
	{
		case 'google' 	: top.location = gurl;
		case 'facebook' : top.location = furl;
	}
}

// --------------------------------------------------- OTHER -------------------------------------------------------------

(function($)
{
	$.fn.toggleFlex = function(condition) 
	{
		return this.each(function() 
		{
			if (condition)
				$(this).removeClass('d-none').addClass('d-flex'); 

			else 
				$(this).removeClass('d-flex').addClass('d-none');
		});
	};

}(jQuery));