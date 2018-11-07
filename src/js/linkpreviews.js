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

		console.log( URIMODERN_LINKS );

		// Add the popup container div
		popup = document.createElement( 'div' );
		popup.id = 'link-preview-container';
		document.getElementById( 'content' ).appendChild( popup );

		// Get the links in the first .entry-content
		content = document.querySelector( '.entry-content' );
		links = content.querySelectorAll( 'a' );

		// Set ids and add event listeners
		i = 0;
		for ( key in URIMODERN_LINKS ) {
			//links[i].setAttribute( 'data-preview-id', key );
			links[i].addEventListener( 'mouseover', handleHover.bind( null, links[i], key ), false );
			links[i].addEventListener( 'mouseout', handleOut, false );
			i++;
		}

		console.log( links );

	}

	function handleHover( el, id ) {

		var img, title, x, y;
		
		if ( 0 == URIMODERN_LINKS[id]['postID'] ) {
			return;
		}

		x = el.offsetTop;
		y = el.offsetLeft;

		img = URIMODERN_LINKS[id]['thumb'];
		title = URIMODERN_LINKS[id]['title'];

		popup.innerHTML = img + '<br >' + title;
		popup.style.left = y + 'px';
		popup.style.top = 'calc( 4rem + ' + x + 'px)';
		popup.className = 'visible';

	}

	function handleOut() {

		popup.className = 'hidden';

	}

})();
