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
/*global $, spa, window */
spa.shell = (function (global) {
    var configMap = {
            chat_extend_time: 1000,
            chat_retract_time: 300,
            chat_extend_height: 450,
            chat_retract_height: 15
        },
        stateMap = { $container : null },
        jqueryMap = {},

        setJqueryMap, toggleChat, initModule;

    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $chat: $container.find( '.spa-shell-chat' )
        };
    };

    toggleChat = function ( do_extend, callback ) {
        var
            px_chat_ht = jqueryMap.$chat.height(),
            is_open = px_chat_ht === configMap.chat_extend_height,
            is_closed = px_chat_ht === configMap.chat_retract_height,
            is_sliding = ! is_open && ! is_closed;

        // avoid race condition
        if( is_sliding ) { return false; }

        // Begin extend chat slider
        if ( do_extend ) {
            jqueryMap.$chat.animate(
                { height: configMap.chat_extend_height },
                configMap.chat_extend_time,
                function () {
                    if( callback ) { callback( jqueryMap.$chat ); }
                }
            );
            return true;
        }

        jqueryMap.$chat.animate(
            { height: configMap.chat_retract_height },
            configMap.chat_retract_time,
            function () {
                if ( callback ) { callback( jqueryMap.$chat ); }
            }
        );

        return true;
    };


    initModule = function ( $container ) {
        stateMap.$container = $container;
        // load HTML and map jQuery collections
        $container.load('layout.html', function (html) {
            configMap.main_html = html;
            setJqueryMap();
        });

        // test toggle
        global.setTimeout(function () {toggleChat( true ); }, 3000);
        global.setTimeout(function () {toggleChat( false ); }, 8000);
    };

    return {
        initModule: initModule
    };
}(window));