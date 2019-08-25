/*
	Solid State by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}


	// Menu.
		var $menu = $('#menu');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();

				// Hide.
					$menu._hide();

			})
			.find('.inner')
				.on('click', '.close', function(event) {

					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();

					// Hide.
						$menu._hide();

				})
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				});

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});
})(jQuery);


const newFonts = () => {
	//Clear Menu to avoid overflow
	document.getElementsByClassName('links')[0].innerHTML = '';

	//Access GoogleAPIs webfonts service and sort by popularity
	fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCKDRrItgVcxrwi8AZwgqMnK4hyEC5tCoY&sort=popularity',{
		headers: { 
			'Content-Type': 'application/json; charset=utf8'
			}
		})   //Parse response as JSON
		.then(responseData => responseData.json())
		.then(fontData => { //Generate a random number between 5 (the length of our upcoming array) and 955 (the current amount of fonts)
			let arrayEndNum = Math.floor(5 + Math.random(1)*955);
			let fontArray = []; //Empty array for pseudo-random fonts
			for(let i = 0; i < 5; i++){ 
				let currentFont = fontData.items[arrayEndNum - 5 + Number(i)] //Select from our webfont JSON
				fontArray.push({ //Push object with font-family and link for HTML 
					fontFamily: currentFont.family,
					htmlLink: `https://fonts.googleapis.com/css?family=${currentFont.family}&display=swap`
				});
			}
				//Iterate through array of font objects we just created
			fontArray.forEach(font => {
				//First, add a tag to our HTML file so we can access our fonts
				let linkTag = document.getElementsByTagName('head')[0].appendChild(document.createElement('link')); //Create link tag
				linkTag.href = font.htmlLink; //add font link as href
				linkTag.rel = 'stylesheet'; // rel='stylesheet'

				//Now, let's put those fonts in our menu
				let fontMenuLi = document.getElementsByClassName('links')[0].appendChild(document.createElement('li')); //Create list item
				let fontAnchor = fontMenuLi.appendChild(document.createElement('a')); //Create anchor tag
				fontAnchor.innerText = font.fontFamily; //Make anchor tag text = font-family name
				fontAnchor.href = `https://fonts.google.com/specimen/${font.fontFamily}`; //Set link to site for font
				fontAnchor.setAttribute('target', '_blank'); //Openable in a new tab or window
				fontAnchor.style.fontFamily = font.fontFamily; //Make font-family styling = font-family from our object
				fontAnchor.cursor = 'pointer'; //Make our anchor look cleaner with a pointer for the cursor
			});
		})
		.catch(anError => console.log(anError)); //Log any errors
}

newFonts();


const moreToCome = () => {
			document.getElementById('browseAll').innerHTML = "More to Come!";
		}