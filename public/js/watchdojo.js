var watchdojoEmbed;
var width = '100%';
var height = '420';
var elementLoading = "<div style=\"background-color:#263238; width:100%; height:100%; top:0;\"><h4 style=\"margin:0px; text-align:center; text-transform:uppercase; padding-top:40%; font-size:20px; color:#FFF;\">Loading ....</h4></div>";	
function RunJwPlayer (selector, cover , title ,  sub , film, options) {
	if (options != undefined) {
		width = options.width || width;
		height = options.height || width;
	}
	$("#" + selector).html(elementLoading);
	watchdojoEmbed = jwplayer(selector).setup({
		playlist:[{
			image: cover,
			sources : film,
			tracks : sub,
			title : title
		}],
			sharing : {link:""},
			startparam : "begin",
			displaytitle :false,
			width : width,
			height : height,
			captions : {
				back :false,
				fontsize : 20
			}
	});
}


$.fn.watchdojo = function(options) {
	jwplayer.key="QgvdKpoES/cVT96vc7NNyOHaemmnZdEEcLbfi+KQXd4HzLSUtQImuNkVWGnPP1VY";
	var selector = this;
	var id_emdb = $(selector).attr("data-embed");
	if (options != undefined) {
		width = options.width || width;
		height = options.height || width;

		if (options.rebuild == true) {
			watchdojoEmbed.remove();
			$(selector).html(elementLoading);
		}

		if (options.id_emdb != undefined) {
			// $(selector).append(element);
			id_emdb = options.id_emdb;
		}
	}
	
	$(selector).width(width).height(height);
	if (id_emdb == undefined) {
		return $(selector).text("ERROR DATA NOT KNOWN");
	}
	else {
		$.ajax({
			url : 'http://embed-safiul.rhcloud.com/embed/' + id_emdb,
			crossDomain : true,
			type : 'GET',
			beforeSend : function() {
				$(selector).append(elementLoading);
				console.log("Loading");
			},
			success : function (msg) {
				if (msg.status == 'sukses') {
					return RunJwPlayer($(selector).attr("id"), msg.data.cover , msg.data.title , msg.data.subtitle , msg.data.film, { width : width , height : height});
				} else {
					$(selector).text('Error');
				}
			}
		});
	}
}