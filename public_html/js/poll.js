$(document).ready(function(){

	// Listen to the form for a submit event
	$('#poll').submit(function(event){

		// Stop the form from submitting
		event.preventDefault();

		// Find the checked option
		var voteValue = $('[name=vote]:checked').val();

		// Make sure the vote is valid
		if(voteValue == undefined) {
			// Display an error message
			$('#message').html('Please select your vote!');
			$('#message').removeClass('success').addClass('error');
		}

		if(voteValue == undefined) return;

		//AJAX
		$.ajax({

			type: 'get',
			url: 'api/poll.php',
			data: {
				vote:voteValue
			},
			success: function(dataFromServer) {
				console.log(dataFromServer);
			},
			error: function() {
				console.log("Cannot connect to server");
			}

		});


	});


});