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
		var output = "<div class='article'><div class='row'><div class='col-md-9'>";

		$.each(result.POSTS, function (i, field) {
			if (field.ID === nArticle.toString()) {

			}
		}
	});
}