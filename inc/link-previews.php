<?php
/**
 * Link previews
 *
 * @package uri-modern
 */

/**
 * Register a new API route
 */
function uri_modern_register_rest_route_get_post_by_path() {

	register_rest_route(
		'uri-modern/',
		'getPostByPath',
		array(
			'methods' => 'GET',
			'callback' => 'uri_modern_get_post_by_path',
			'args' => array(
				'path' => array(
					'required' => false,
				),
			),
		)
	);

}
add_action( 'rest_api_init', 'uri_modern_register_rest_route_get_post_by_path' );

/**
 * The callback for the API route
 */
function uri_modern_get_post_by_path( WP_REST_Request $request ) {

	$id = url_to_postid( $request['path'] );
	$data = array(
		'id' => $id,
		'type' => get_post_type( $id ),
		'excerpt' => get_the_excerpt( $id ),
		'thumb' => get_the_post_thumbnail( $id ),
	);

	$response = new WP_REST_Response( $data );
	return $response;

}
