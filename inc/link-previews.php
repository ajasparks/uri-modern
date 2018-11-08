<?php
/**
 * Link previews
 *
 * @package uri-modern
 */

add_action(
	 'rest_api_init',
	function () {

register_rest_route(
	   'uri-modern/',
	  'getIDByPath',
	  array(
		  'methods' => 'GET',
		  'callback' => 'uri_modern_get_id_by_path',
		  'args' => array(
			  'path' => array(
				  'required' => false,
			  ),
		  ),
	  )
	  );

}
	);

function uri_modern_get_id_by_path( WP_REST_Request $request ) {

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
