function externalLinks() {
	var links = document.getElementsByTagName("a");

	for (var i = 0; i < links.length; i++) {
		var link = links[i];

		if (link.getAttribute("href") && link.hostname !== location.hostname) {
			if (!link.getAttribute("target") || link.getAttribute("target") === "") {
				link.target = "_blank";
			}
		}
	}
}

externalLinks();

gsap.registerPlugin();

// animação inicial das linhas
document.querySelectorAll(".line").forEach((line) => {

	const length = line.getTotalLength();

	gsap.set(line, {
		strokeDasharray: length,
		strokeDashoffset: length
	});

	gsap.to(line, {
		strokeDashoffset: 0,
		duration: 6,
		ease: "none"
	});

});


// movimento contínuo das linhas
gsap.to(".line", {
	y: "+=25",
	duration: 8,
	stagger: 1,
	repeat: -1,
	yoyo: true,
	ease: "sine.inOut"
});


// pontos pulsando
gsap.to(".dot", {
	scale: 2.5,
	opacity: .1,
	duration: 2,

	stagger: {
		each: .2,
		repeat: -1
	},

	repeat: -1,
	yoyo: true,
	ease: "sine.inOut"
});


// pequenas movimentações aleatórias nos pontos
document.querySelectorAll(".dot").forEach(dot => {

	gsap.to(dot, {
		x: "random(-15,15)",
		y: "random(-15,15)",
		duration: "random(3,6)",
		repeat: -1,
		yoyo: true,
		ease: "sine.inOut"
	});

});


// efeito mouse / parallax
window.addEventListener("mousemove", (e) => {

	let x = (e.clientX - window.innerWidth / 2) * 0.03;
	let y = (e.clientY - window.innerHeight / 2) * 0.03;

	gsap.to(".hero-lines", {
		x,
		y,
		duration: 2,
		ease: "power2.out"
	});

});


// movimento suave constante no SVG inteiro
gsap.to(".hero-lines", {
	y: -20,
	duration: 10,
	repeat: -1,
	yoyo: true,
	ease: "sine.inOut"
});

const backBtn = document.querySelector("#backToTop");

window.addEventListener("scroll", () => {

	if (window.scrollY > 500) {

		gsap.to(backBtn, {
			autoAlpha: 1,
			y: 0,
			duration: .4
		});

	} else {

		gsap.to(backBtn, {
			autoAlpha: 0,
			y: 20,
			duration: .4
		});

	}

});


backBtn.addEventListener("click", () => {

	window.scrollTo({
		top: 0,
		behavior: "smooth"
	});

});


(function ($) {

	var $window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: [null, '480px']
	});

	// Hack: Enable IE flexbox workarounds.
	if (browser.name == 'ie')
		$body.addClass('is-ie');

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Forms.

	// Hack: Activate non-input submits.
	// $('form').on('click', '.submit', function(event) {

	// 	// Stop propagation, default.
	// 		event.stopPropagation();
	// 		event.preventDefault();

	// 	// Submit form.
	// 		$(this).parents('form').submit();

	// });

	// Sidebar.
	if ($sidebar.length > 0) {

		var $sidebar_a = $sidebar.find('a');

		$sidebar_a
			.addClass('scrolly')
			.on('click', function () {

				var $this = $(this);

				// External link? Bail.
				if ($this.attr('href').charAt(0) != '#')
					return;

				// Deactivate all links.
				$sidebar_a.removeClass('active');

				// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
				$this
					.addClass('active')
					.addClass('active-locked');

			})
			.each(function () {

				var $this = $(this),
					id = $this.attr('href'),
					$section = $(id);

				// No section for this link? Bail.
				if ($section.length < 1)
					return;

				// Scrollex.
				$section.scrollex({
					mode: 'middle',
					top: '-20vh',
					bottom: '-20vh',
					initialize: function () {

						// Deactivate section.
						$section.addClass('inactive');

					},
					enter: function () {

						// Activate section.
						$section.removeClass('inactive');

						// No locked links? Deactivate all links and activate this section's one.
						if ($sidebar_a.filter('.active-locked').length == 0) {

							$sidebar_a.removeClass('active');
							$this.addClass('active');

						}

						// Otherwise, if this section's link is the one that's locked, unlock it.
						else if ($this.hasClass('active-locked'))
							$this.removeClass('active-locked');

					}
				});

			});

	}

	// Scrolly.
	$('.scrolly').scrolly({
		speed: 1000,
		offset: function () {

			// If <=large, >small, and sidebar is present, use its height as the offset.
			if (breakpoints.active('<=large')
				&& !breakpoints.active('<=small')
				&& $sidebar.length > 0)
				return $sidebar.height();

			return 0;

		}
	});

	// Spotlights.
	$('.spotlights > section')
		.scrollex({
			mode: 'middle',
			top: '-10vh',
			bottom: '-10vh',
			initialize: function () {

				// Deactivate section.
				$(this).addClass('inactive');

			},
			enter: function () {

				// Activate section.
				$(this).removeClass('inactive');

			}
		})
		.each(function () {

			var $this = $(this),
				$image = $this.find('.image'),
				$img = $image.find('img'),
				x;

			// Assign image.
			$image.css('background-image', 'url(' + $img.attr('src') + ')');

			// Set background position.
			if (x = $img.data('position'))
				$image.css('background-position', x);

			// Hide <img>.
			$img.hide();

		});

	// Features.
	$('.features')
		.scrollex({
			mode: 'middle',
			top: '-20vh',
			bottom: '-20vh',
			initialize: function () {

				// Deactivate section.
				$(this).addClass('inactive');

			},
			enter: function () {

				// Activate section.
				$(this).removeClass('inactive');

			}
		});

})(jQuery);