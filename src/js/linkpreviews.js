/**
 * Link previews
 *
 * @package uri-modern
 */

( function() {

	'use strict';

	var popup;

	window.addEventListener( 'load', initLinkPreviews(), false );

	function initLinkPreviews() {

		var links, content, i, key;

		// Add the popup container div
		popup = document.createElement( 'div' );
		popup.id = 'link-preview-container';
		document.getElementById( 'content' ).appendChild( popup );

		// Get the links in the first .entry-content
		content = document.querySelectorAll( '.entry-content' );
		links = [];
		// @todo: fix this so it concats links for all content blocks
		for ( i = 0; i < content.length; i++ ) {
			links = content[i].querySelectorAll( 'a' );
		}

		console.log( links );

		// Set ids and add event listeners
		for ( i = 0; i < links.length; i++ ) {
			links[i].addEventListener( 'mouseover', handleHover.bind( null, links[i] ), false );
			links[i].addEventListener( 'mouseout', handleOut, false );
		}
	}

	function fetch( url, success, el ) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if ( xmlhttp.readyState == XMLHttpRequest.DONE ) {
				if ( 200 == xmlhttp.status ) {
					success( el, xmlhttp.responseText );
				} else if ( 404 == xmlhttp.status ) {
					console.log( 'error 404 was returned' );
				} else {
					console.log( 'something else other than 200 or 404 was returned' );
				}
			}
		};

		xmlhttp.open( 'GET', url, true );
		xmlhttp.send();
	}

	function handleHover( el ) {

		var path, url, base;

		path = el.getAttribute( 'href' );

		url = URIMODERN.base + '/wp-json/uri-modern/getPostByPath?path=' + path;
		// console.log( url );
		fetch( url, makePopUp, el )

	}

	function makePopUp( el, raw ) {

		var data, x, y, content;

		data = JSON.parse( raw );
		// console.log( data );
		if ( 0 == data.id ) {
			return;
		}

		x = el.offsetTop;
		y = el.offsetLeft;

		content = data.thumb + '<div>' + data.excerpt + '</div>';

		popup.innerHTML = content;
		popup.style.left = y + 'px';
		popup.style.top = 'calc( 4rem + ' + x + 'px)';
		popup.className = 'visible';

	}

	function handleOut() {

		popup.className = 'hidden';

	}
}
				)();
