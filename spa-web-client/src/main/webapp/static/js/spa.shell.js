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
            anchor_schema_map: {
                chat: { opened : true, closed : true }
            },
            main_html: null,
            chat_extend_time: 250,
            chat_retract_time: 300,
            chat_extend_height: 450,
            chat_retract_height: 15,
            chat_extended_title: 'Click to retract',
            chat_retracted_title: 'Click to extend',
            resize_interval: 200
        },
        stateMap = {
            $container : undefined,
            anchor_map: {},
            resize_idto: undefined
         },
        jqueryMap = {},

        copyAnchorMap, setJqueryMap,
        changeAnchorPart, onHashchange, onResize,
        setChatAnchor, initModule;

    // utility methods
    copyAnchorMap = function () {
        return $.extend( true, {}, stateMap.anchor_map );
    };

    // DOM methods
    changeAnchorPart = function ( arg_map ) {
        var
            anchor_map_revise = copyAnchorMap(),
            bool_return = true,
            key_name, key_name_dep;

        KEYVAL:
        for ( key_name in arg_map ) {
            if ( arg_map.hasOwnProperty( key_name ) ) {

                // skip dependent keys during iteration
                if ( key_name.indexOf( '_') === 0 ) { continue KEYVAL; }

                // update independent key value
                anchor_map_revise[key_name] = arg_map[key_name];

                // update matching dependent key
                key_name_dep = '_' + key_name;
                if ( arg_map[key_name_dep] ) {
                    anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
                } else {
                    delete anchor_map_revise[key_name_dep];
                    delete anchor_map_revise['_s' + key_name_dep];
                }
            }
        }

        // Begin attempt to update URI; revert if not successful
        try {
            $.uriAnchor.setAnchor( anchor_map_revise );
        } catch ( error ) {
            // replace URI with existing state
            $.uriAnchor.setAnchor( stateMap.anchor_map,null,true );
            bool_return = false;
        }

        return bool_return;
    };

    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = { $container : $container };
    };

    // Event Handlers
    onHashchange = function ( event ) {
        var
            _s_chat_previous, _s_chat_proposed, s_chat_proposed,
            anchor_map_proposed,
            is_ok = true,
            anchor_map_previous = copyAnchorMap();

            // attempt to parse anchor
            try {
                anchor_map_proposed = $.uriAnchor.makeAnchorMap();
            } catch ( error ) {
                $.uriAnchor.setAnchor( anchor_map_previous, null, true );
                return false;
            }
            stateMap.anchor_map = anchor_map_proposed;

            // convenience vars
            _s_chat_previous = anchor_map_previous._s_chat;
            _s_chat_proposed = anchor_map_proposed._s_chat;

            // adjust chat component if changed
            if ( ! anchor_map_previous
                || _s_chat_previous !== _s_chat_proposed
            ) {
                s_chat_proposed = anchor_map_proposed.chat;
                switch ( s_chat_proposed ) {
                    case 'opened':
                        is_ok = spa.chat.setSliderPosition('opened');
                    break;
                    case 'closed':
                        is_ok = spa.chat.setSliderPosition('closed');
                    break;
                    default:
                        toggleChat( false );
                        delete anchor_map_proposed.chat;
                        $.uriAnchor.setAnchor( anchor_map_proposed, null, true );
                }
            }

            if( ! is_ok ) {
                if ( anchor_map_previous ) {
                    $.uriAnchor.setAnchor( anchor_map_previous, null, true );
                    stateMap.anchor_map = anchor_map_previous;
                } else {
                    delete anchor_map_proposed.chat;
                    $.uriAnchor.setAnchor( anchor_map_proposed, null, true );
                }
            }

            return false;
    };

    onResize = function (){
        if ( stateMap.resize_idto ){ return true; }

        spa.chat.handleResize();
        stateMap.resize_idto = setTimeout(
            function () { stateMap.resize_idto = undefined; },
            configMap.resize_interval
        );
        return true;
    };

    setChatAnchor = function ( position_type ) {
        return changeAnchorPart({ chat : position_type });
    }

    initModule = function ( $container, $templates ) {
        stateMap.$container = $container;
        // load HTML and map jQuery collections
        configMap.main_html = $templates.find('#spa-shell').html();
        $container.html( configMap.main_html );
        setJqueryMap();

        // configure uriAnchor to use our schema
        $.uriAnchor.configModule({
            schema_map: configMap.anchor_schema_map
        });

        // configure and initialize feature modules
        spa.chat.configModule({
            set_chat_anchor: setChatAnchor,
            chat_model: spa.model.chat,
            people_model: spa.model.people
        });
        spa.chat.initModule( jqueryMap.$container, $templates );

        $(global)
            .bind('resize', onResize)
            .bind( 'hashchange', onHashchange )
            .trigger( 'hashchange' );
    };

    return {
        initModule: initModule
    };
}(window));