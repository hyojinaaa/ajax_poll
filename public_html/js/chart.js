

$(document).ready(function(){

	// set up AJAX
	$.ajax({
		type: 'get',
		datatype: 'json',
		url: 'api/charts.php',
		success: function(dataFromServer){
			console.log(dataFromServer);
			// Load the Visualization API and the corechart package.
			google.charts.load('current', {'packages':['corechart']});
			// Set a callback to run when the Google Visualization API is loaded.
			google.charts.setOnLoadCallback(drawChart);
			// Callback that creates and populates a data table,
      		// instantiates the pie chart, passes in the data and
      		// draws it.
			function drawChart() {
				// Create the data table.
				var data = new google.visualization.DataTable();

				data.addColumn('string', 'Tag');
				data.addColumn('number', 'TagCount');

				for( var i=0; i<dataFromServer.length; i++ ) {
					var value = parseFloat(dataFromServer[i].TagCount);
					var name = dataFromServer[i].tag;
					data.addRow([name,value]);
				}

				// Set chart options
				var options = {
					title: 'Amount of movie tags'

				};

				// Instantiate and draw our chart, passing in some options.
        		var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        		chart.draw(data, options);

			}
		},
		error: function() {	
			console.log('Cannot connect to server..');
		}
	})


});