<?php
/**
 * Template part for displaying the primary site navigation.
 * It only shows up if the menu location is selected as 'Primary'.
 *
 * @package uri-modern
 */

?>

<div id="localnav">
    <input type="checkbox" id="lnmenu-toggle" role="presentation">
    <label for="lnmenu-toggle" id="lnmenu"><span>Site Menu</span></label>
    <?php wp_nav_menu( array('theme_location' => 'menu-1', 'container' => '', 'fallback_cb' => false) ); ?>
</div>