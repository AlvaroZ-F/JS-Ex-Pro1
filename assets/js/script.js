$(document).ready(function () {
	var nArticle = 0;
	var win = $(window);

	getArticle(nArticle);

	win.scroll(function () {
		if ($(document).height() - win.height() == win.scrollTop()) {
			nArticle++;
			getArticle(nArticle);
		}
	});
});

function getArticle(nArticle = 0) {
	$.getJSON("posts.json", function (result) {

		var output = '';

		$.each(result.POSTS, function (i, field) {
			if (field.ID == nArticle.toString()) {
				output += "<div class='article'><div class='row'><div class='col-md-9'><h3>" + field.Title + "</h3>";
				output += "<p class='art-date'>" + field.Date + "</p></div>";
				output += "<div class=col-md-3><button class='btn btn-primary'>" + field.NComments + " Comentarios</button></div></div>";
				output += "<div class='article-content'><p>" + field.Content + "</p></div></div>";
			}
		});

		$("#article-list").append(output);

	});
}