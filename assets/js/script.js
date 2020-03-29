$(document).ready(function () {

	var nArticle = 0;
	var win = $(window);

	$("#theme-switch-light").hide();

	getArticle(nArticle);
	checkUserLogged();

	win.scroll(function () {
		if ($(document).height() - win.height() == win.scrollTop()) {
			console.log("ID counter increase happened: " + nArticle);
			$(".loading").show();
			nArticle++;
			getArticle(nArticle);
			$(".loading").hide();
		}
	});

	win.scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('.to-top').fadeIn();
		} else {
			$('.to-top').fadeOut();
		}
	});

	$('.to-top').click(function () {
		$('html, body').animate({ scrollTop: 0 }, 800);
		return false;
	});

	$("#theme-switch-dark").click(function () {
		$("html, body").css({ "background-color": "#2a2a2a", "color": "white" });
		$("nav").css({ "background-color": "#A4ADDB" });
		$("nav a").css({ "color": "#292936" });
		$(".figure-title a").css({ "background-color": "#2a2a2a", "color": "white" });
		$("#theme-switch-dark").hide();
		$("#theme-switch-light").show();
	});

	$("#theme-switch-light").click(function () {
		$("html, body").css({ "background-color": "white", "color": "#2a2a2a" });
		$("nav").css({ "background-color": "#2a2a2a" });
		$("nav a").css({ "color": "#A4ADDB" });
		$(".figure-title a").css({ "background-color": "white", "color": "#2a2a2a" });
		$("#theme-switch-light").hide();
		$("#theme-switch-dark").show();
	});

	$("#form-modal").submit(function () {
		localStorage.setItem("username", $(this).serializeArray()[0]["value"]);
	});

	$("#logout_user").click(function () {		
		localStorage.clear();
		location.reload();
	});

});

function getArticle(nArticle) {
	$.getJSON("posts.json", function (result) {

		var output = '';
		var newdate = [];

		$.each(result, function (i, field) {
			if (field.ID == nArticle.toString()) {
				output += "<div class='article'><div class='row'><div class='col-md-9'><h3>" + field.Title + "</h3>";
				newdate = field.Date.split('-');
				output += "<p class='art-date'>Publicado el " + newdate[2] + " de " + newdate[1] + " del a&ntilde;o " + newdate[0] + "</p></div>";
				output += "<div class=col-md-3><button class='btn btn-primary'>" + field.NComments + " Comentarios</button></div></div>";
				output += "<div class='article-content'><p>" + field.Content + "</p></div></div>";
				return false;
			}
		});

		$("#article-list").append(output);

	});
}

function checkUserLogged() {
	if (localStorage.getItem("username")) {
		$("#login").hide();
		$(".username_logged").show();
		$(".username_logged").html("<a href='#'>Welcome " + localStorage.getItem("username") + "</a>");
		$("#logout_user").show();
	} else {
		$("#login").show();
		$(".username_logged").hide();
		$("#logout_user").hide();
	}
}