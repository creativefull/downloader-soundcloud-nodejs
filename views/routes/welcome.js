function Welcome(db) {
	var soundcloud = require('grab-soundcloud');
	var request = require("request");

	this.index = function(req,res,next) {
		res.render('home');
	}

	this.download = function(req,res,next) {
		var url = req.body.url;
		soundcloud.getTrackDetail(url, function(err, doc) {
			if (doc != null) {
				var data = [];
				var isi = {};
				isi.judul = doc.title;
				request({ url : 'https://api.soundcloud.com/i1/tracks/' + doc.id + '/streams?client_id=02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea&app_version=540273e'}, function(err, response, body) {
					var data2 = JSON.parse(body);
					isi.url = data2.http_mp3_128_url;
					data.push(isi);
					res.json(data);
				})
			}
			else {
				res.json("error");
			}
		});
	}
}
module.exports = Welcome;