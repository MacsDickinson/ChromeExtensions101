var imageGenerator = {

	requestImages: function() {
		var searchTerm = document.getElementById('searchTerm').value;
	  
		var req = new XMLHttpRequest();
		req.open("GET", 'https://api.instagram.com/v1/tags/' + searchTerm + '/media/recent?access_token=51998352.1fb234f.1cff33c9ce24494e92536e353b1b1ee2', true);
		req.onload = this.showImages.bind(this);
		req.send(null);
	},
	clearResults: function() {
		var results = document.getElementById('results');
		var children = results.children;
		for (var i = children.length; i > 0; i--) {
			results.removeChild(children[i-1]);
		}
	},
	showImages: function (e) {
		this.clearResults();
		var response = eval('(' + e.target.responseText + ')');
		for (var i = 0; i < response.data.length; i++) {
			var img = document.createElement('img');
			img.src = response.data[i].images.thumbnail.url;
			if (response.data[i].caption) {
				img.setAttribute('alt', response.data[i].caption.text);
			}
			document.getElementById('results').appendChild(img);
		}
	}
};

document.addEventListener('DOMContentLoaded', function () {
	imageGenerator.requestImages();
	document.getElementById("search").addEventListener("click", requestImages, false);
});

function requestImages() {
	imageGenerator.requestImages();
}