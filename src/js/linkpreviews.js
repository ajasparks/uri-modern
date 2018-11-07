/**
 * Link previews
 *
 * @package uri-modern
 */

( function() {

	'use strict';

	window.addEventListener( 'load', initLinkPreviews(), false );

	function initLinkPreviews() {
		
		var links, content, i, key;

		console.log( URIMODERN_LINKS );
		
		content = document.querySelector( '.entry-content' );
		links = content.querySelectorAll( 'a' );
		
		i = 0;
		for ( key in URIMODERN_LINKS ) {
			links[i].setAttribute( 'data-preview-id', key );
			i++;
		}
		
		console.log( links );

	}

})();
