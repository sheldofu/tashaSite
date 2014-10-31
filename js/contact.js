
/*
Contact form
*/
jQuery(document).ready(function() {
	$('#contact-form form').submit(function() {
		var postdata = $('#contact-form form').serialize();
		$.ajax({
		type: 'POST',
		url: 'sendmail.php',
		data: postdata,
		dataType: 'json',
		success: function(json) {
				if(json.nameMessage != '') {
					//$('#contact-form form #name').val(json.nameMessage);
					$('#contact-form form #name').attr("placeholder",json.nameMessage);
				}
				if(json.emailMessage != '') {
					$('#contact-form form #email').attr("placeholder",json.emailMessage);
				}
				if(json.phoneMessage != '') {
					$('#contact-form form #phone').attr("placeholder",json.phoneMessage);
				}
				if(json.nameMessage == '' && json.emailMessage == '' && json.phoneMessage == '') {
					$('#contact-form form').fadeOut('fast', function() {
						$('#contact-form').append('<p id="thanksMessage">Thanks for contacting me!</p>');
					});
				}
			}
		});
		return false;
	});
});