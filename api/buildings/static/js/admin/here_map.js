(function($) {
  // We'll insert the map after this element:
  var prev_el_selector = ".form-row.field-country";

  // The input elements we'll put lat/lon into and use
  // to set the map's initial lat/lon.
  var lat_input_selector = "#id_latitude";
  var lon_input_selector = "#id_longitude";

  // The input elements we'll put the address string and country code into.
  var address_input_selector = "#id_address";
  var country_input_selector = "#id_country";

  // If we don't have a lat/lon in the input fields,
  // this is where the map will be centered initially.
  var initial_lat = 51.516448;
  var initial_lon = -0.130463;

  var platform = new H.service.Platform({
    'apikey': 'ZMYRTYl3Tih7lfgv7tCz8UyuemS6lTD9us7FLvexFio'
  });

  var defaultLayers = platform.createDefaultLayers();

  function initMap() {
     var $prevEl = $(prev_el_selector);

     $prevEl.after($('<div class="setloc-map js-setloc-map" id="map-container"></div>'));

     var mapEl = document.getElementsByClassName("js-setloc-map")[0];

     map = new H.Map(document.getElementById('map-container'),
            defaultLayers.vector.normal.map);
  }

  $(document).ready(function() {
    initMap();
  });
})(django.jQuery);