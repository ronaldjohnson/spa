// spa.js
// Root namespace module

/*jslint browser: true, continue: true,
    devel: true, indent: 4, maxerr: 50,
    newcap: true, nomen: true, plusplus: true,
    regexp: true, sloppy: true, vars: false,
    white: true
*/
/*global $, spa:true */

var spa = (function () {
    var initModule = function ( $container, $templates ) {
        spa.shell.initModule( $container, $templates );
    };

    return {initModule: initModule};
}());