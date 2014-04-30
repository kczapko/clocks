(function( $ ) {

    if ( !$.cssHooks ) {
        throw( new Error( "jQuery 1.4.3+ is needed for this plugin to work" ) );
    }

    function styleSupport( prop ) {
        var vendorProp, supportedProp,
            capProp = prop.charAt( 0 ).toUpperCase() + prop.slice( 1 ),
            prefixes = [ "Moz", "Webkit", "O", "ms" ],
            div = document.createElement( "div" );

        if ( prop in div.style ) {
            supportedProp = prop;
        } else {
            for ( var i = 0; i < prefixes.length; i++ ) {
                vendorProp = prefixes[ i ] + capProp;
                if ( vendorProp in div.style ) {
                    supportedProp = vendorProp;
                    break;
                }
            }
        }

        div = null;
        $.support[ prop ] = supportedProp;
        return supportedProp;
    }

    var animation = styleSupport( "animation" );
    // Set cssHooks only for browsers that support a vendor-prefixed border radius
    if ( animation && animation !== "animation" ) {
        $.cssHooks.animation = {
            get: function( elem, computed, extra ) {
                return $.css( elem, animation );
            },
            set: function( elem, value) {
                elem.style[ animation ] = value;
            }
        };
    }

})( jQuery );

$(function() {

    var 
        now = moment(),
        s = now.second(),
        m = now.minute(),
        h = now.hour();

  $( '#clock .second' ).css( 'animation', 'around 60s steps(60, end) -' + s + 's infinite' );
  $( '#clock .minute' ).css( 'animation', 'around 3600s linear -' + (m * 60 + s) +'s infinite' );
  $( '#clock .hour' ).css( 'animation', 'around 43200s linear -' + (h * 60 * 60 + m * 60 + s)+'s infinite' );

});