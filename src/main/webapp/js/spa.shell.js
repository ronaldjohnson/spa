/*
 * spa.shell.js
 * Shell module for SPA
 */

/*jslint   browser : true, continue : true,
    devel : true, indent : 4, maxerr : 50,
    newcap : true, nomen : true, plusplus : true,
    regexp : true, sloppy: true, vars : false,
    white : true
*/
/*global $, spa */
spa.shell = (function () {
    var configMap = {},
        stateMap = { '$container' : null },
        jqueryMap = {},
        setJqueryMap, initModule;

    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = { '$container' : $container };
    };

    initModule = function ( $container ) {
        $container.load('layout.html', function (html) {
            configMap.main_html = html;
        });
        stateMap.$container = $container;
        $container.html( configMap.main_html );
        setJqueryMap();
    };

    return {
        initModule: initModule
    };
}());