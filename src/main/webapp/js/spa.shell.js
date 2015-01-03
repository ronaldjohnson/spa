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
            chat_retract_height: 15,
            chat_extended_title: 'Click to retract',
            chat_retracted_title: 'Click to extend'
        },
        stateMap = {
            $container : null,
            is_chat_retracted: true
         },
        jqueryMap = {},

        setJqueryMap, toggleChat, onClickChat, initModule;

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
                    jqueryMap.$chat.attr('title', configMap.chat_extended_title);
                    stateMap.is_chat_retracted = false;
                    if( callback ) { callback( jqueryMap.$chat ); }
                }
            );
            return true;
        }

        // Retract chat slider
        jqueryMap.$chat.animate(
            { height: configMap.chat_retract_height },
            configMap.chat_retract_time,
            function () {
                jqueryMap.$chat.attr('title', configMap.chat_retracted_title);
                stateMap.is_chat_retracted = true;
                if ( callback ) { callback( jqueryMap.$chat ); }
            }
        );

        return true;
    };

    // Event Handlers
    onClickChat = function ( event ) {
        toggleChat( stateMap.is_chat_retracted );
        return false;
    };

    initModule = function ( $container ) {
        stateMap.$container = $container;
        // load HTML and map jQuery collections
        $container.load('layout.html', function (html) {
            configMap.main_html = html;
            setJqueryMap();

            // initialize chat slider and bind click handler
            stateMap.is_chat_retracted = true;
            jqueryMap.$chat.attr('title', configMap.chat_retracted_title)
                .click( onClickChat );
        });
    };

    return {
        initModule: initModule
    };
}(window));