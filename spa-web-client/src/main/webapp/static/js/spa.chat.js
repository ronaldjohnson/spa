/*
 * spa.chat.js
 * Chat feature module for SPA
 */

 /*jslint browser: true, continue: true,
 devel: true, indent: 4, maxerr: 50,
 newcap: true, nomen: true, plusplus: true,
 regexp: true, sloppy: true, vars: false,
 white: true
 */

 /*global $, spa */

spa.chat = (function () {
    //--------------------- BEGIN MODULE SCOPE VARIABLES ------------
    var configMap = {
        $main_html: null,
        settable_map: {}
    },
    stateMap = { $container: null },
    jqueryMap = {},
    setJqueryMap, configModule, initModule
    ;

    //---------------------- DOM ------------------------
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = { $container : $container };
    };

    //-------------- PUBLIC API ---------------------
    configModule = function ( input_map ) {
        spa.util.setConfigMap({
            input_map: input_map,
            settable_map: configMap.settable_map,
            config_map: configMap
        });
        return true;
    };

    initModule = function ( $container, $templates ) {
        configMap.$main_html = $templates.find('.spa-chat-hello');
        $container.html( configMap.$main_html );
        stateMap.$container = $container;
        setJqueryMap();
        return true;
    };

    return {
        configModule: configModule,
        initModule: initModule
    }
}());