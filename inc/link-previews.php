<?php
/**
 * Link previews
 *
 * @package uri-modern
 */

function uri_modern_get_page_content_links( $content ) {

	$dom = new DOMDocument;
	$dom->loadHTML( $GLOBALS['post']->post_content );
	$links = $dom->getElementsByTagName( 'a' );

	$a = array();

	foreach ( $links as $link ) {
		$id = uniqid();
		$a[ $id ] = $link->getAttribute( 'href' );
	}

	wp_localize_script( 'uri-modern-scripts', 'URIMODERN_LINKS', $a );
	return $content;

}
add_filter( 'the_content', 'uri_modern_get_page_content_links' );
