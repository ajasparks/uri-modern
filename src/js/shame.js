/**
 * Shame
 *
 * @package uri-modern
 */

( function() {

	'use strict';

	var data = {
		'elClass': 'shamed-element',
		'messageClass': 'shame-message',
		'issues': 0
	};

	document.addEventListener( 'DOMContentLoaded', init, false );

	function init() {

		var x, div;

		if ( ! document.body.classList.contains( 'logged-in' ) ) {
			return;
		}

		data.main = document.getElementById( 'main' );

		shameImages();
		shameLinks();
		shameIDs();
		
		displayStatus();

	}
	
	function displayStatus() {
		
		var div, syntax;
		
		syntax = ( data.issues == 1 ) ? 'issue' : 'issues';
		
		div = document.createElement( 'div' );
		div.className = 'shame-status';
		div.innerHTML = 'This page has ' + data.issues + ' ' + syntax + '.';
		
		data.main.insertBefore( div, data.main.firstChild );
		
	}

	function displayShame( el, classname, message ) {

		var wrapper, div;

		el.classList.add( data.elClass );
		
		++data.issues;
		
		wrapper = document.createElement( 'span' );
		wrapper.className = 'shame-wrapper ' + classname;

		div = document.createElement( 'div' );
		div.className = data.messageClass;
		div.innerHTML = message;
		wrapper.appendChild( div );
		
		el.parentNode.insertBefore( wrapper, el.nextSibling );
		wrapper.insertBefore( el, div );

	}

	function shameImages() {

		var img, i;

		img = data.main.querySelectorAll( 'img[alt=""]' );

		for ( i = 0; i < img.length; i++ ) {

			displayShame( img[i], 'shamed-image', 'Alt attribute required' );

		}

	}

	function shameLinks() {

		var tests, i, j, a;

		tests = [
			{
				selector: 'href="#"',
				message: '"#" is not a valid URL'
			},
			{
				selector: 'href^="javascript:"',
				message: 'No JavaScript in links'
			},
			{
				selector: 'href^="file:"',
				message: 'No linking to local resources'
			},
			{
				selector: 'href^="///"',
				message: 'Link href syntax error'
			}
		];

		for ( i = 0; i < tests.length; i++ ) {

			a = data.main.querySelectorAll( 'a[' + tests[i].selector + ']' );
			
			for ( j = 0; j < a.length; j++ ) {

				displayShame( a[j], 'shamed-link', tests[i].message );

			}

		}

	}
	
	function shameIDs() {
		
		var els, i, id, ids = {}, x;
		
		els = data.main.querySelectorAll( '*[id]' );
		
		for ( i = 0; i < els.length; i++ ) {
			id = els[i].id;
			id in ids ? ids[id]++ : ids[id] = 1;
		}
		
		for ( x in ids ) {
			
			if ( ids[x] > 1 ) {
				els = data.main.querySelectorAll( '[id="' + x + '"]' );
				for ( i = 0; i < els.length; i++ ) {
					displayShame( els[i], 'shamed-duplicate-id', 'No duplicate ids ("' + x + '")' );
				}
			}
			
		}
					
		
			
	}

})();
