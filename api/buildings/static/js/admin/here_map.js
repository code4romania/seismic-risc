(function($) {
  // We'll insert the map after this element:
  var prev_el_selector = "#id_lng";

  // The input elements we'll put lat/lon into and use
  // to set the map's initial lat/lon.
  var lat_input_selector = "#id_lat";
  var lon_input_selector = "#id_lng";

  // The input elements we'll put the address string and country code into.
  var street_input_selector = "#id_address";
  var street_number_input_selector = "#id_street_number"
  var locality_input_selector = "#id_locality";

  // Initial zoom level for the map.
  var initial_zoom = 12;

  // Initial zoom level if input fields have a location.
  var initial_with_loc_zoom = 18;
  var initial_lat = 44.4268;
  var initial_lon = 26.1025;
  var is_view_building_change_form = false;

  function addDraggableMarker(map, behavior, lat, lng) {
    var marker = new H.map.Marker({lat:lat, lng:lng}, {
      // mark the object as volatile for the smooth dragging
      volatility: true
    });
    // Ensure that the marker can receive drag events
    marker.draggable = true;
    map.addObject(marker);

    // disable the default draggability of the underlying map
    // and calculate the offset between mouse and target's position
    // when starting to drag a marker object:
    map.addEventListener('dragstart', function(ev) {
      var target = ev.target;
      var pointer = ev.currentPointer;
      if (target instanceof H.map.Marker) {
        var targetPosition = map.geoToScreen(target.getGeometry());
        target['offset'] = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
        behavior.disable();
      }
    }, false);

    map.addEventListener('dragend', function(ev) {
      var target = ev.target;
      if (target instanceof H.map.Marker) {
        // update the lat and long input fields with the marker's new coordinates
        var new_lat = Number.parseFloat(marker.getGeometry().lat).toFixed(4);
        var new_lng = Number.parseFloat(marker.getGeometry().lng).toFixed(4);

        $(lat_input_selector).val(new_lat);
        $(lon_input_selector).val(new_lng);

        // re-enable the default draggability of the underlying map
        // when dragging has completed
        behavior.enable();
      }
    }, false);

    // Listen to the drag event and move the position of the marker
    // as necessary
     map.addEventListener('drag', function(ev) {
      var target = ev.target;
      var pointer = ev.currentPointer;
      if (target instanceof H.map.Marker) {
        target.setGeometry(map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y));
      }
    }, false);
  }

  function chooseCorrectAddress(items) {
    var items_w_distance = items.map((item) => {
        const startPoint = new H.geo.Point(initial_lat, initial_lon);
        const endPoint = new H.geo.Point(item.position.lat, item.position.lng);

        return {
            ...item,
            distance: startPoint.distance(endPoint)
        }
    })
    var min = Math.min(...items_w_distance.map(item => item.distance));
    return items_w_distance.filter(item => item.distance === min)
  }

  function initMap() {
     var mapConfig =
      typeof here_map_config !== "undefined"
        ? here_map_config
        : false;

     var platform = new H.service.Platform({
        'apikey': mapConfig.api_key
     });
     var defaultLayers = platform.createDefaultLayers();
     var service = platform.getSearchService();
     var $prevEl = $(prev_el_selector);
     if ($prevEl.length === 0) {
        // Can't find where to put the map.
        console.error("Can't find where to insert the map element");
        return;
     }

     $prevEl.after($('<div class="setloc-map js-setloc-map" id="map-container"></div>'));

     var $lat = $(lat_input_selector);
     var $lon = $(lon_input_selector);
     var street = $(street_input_selector).val();
     var streetNumber = parseFloat($(street_number_input_selector).val());
     var city = $(locality_input_selector).val();

     var has_initial_loc = $lat.val() && $lon.val();

     if (has_initial_loc) {
        // There is lat/lon in the fields, so centre the map on that.
          initial_lat = parseFloat($lat.val());
          initial_lon = parseFloat($lon.val());
          initial_zoom = initial_with_loc_zoom;
     }

     $(lat_input_selector).val(initial_lat);
     $(lon_input_selector).val(initial_lon);

     map = new H.Map(document.getElementById('map-container'),
       defaultLayers.vector.normal.map, {
         center: { lat: initial_lat, lng: initial_lon },
         zoom: initial_zoom
       });

     window.addEventListener('resize', () => map.getViewPort().resize());
     var ui = H.ui.UI.createDefault(map, defaultLayers, 'en-US');
     var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

     if (!has_initial_loc) {
        // Get an instance of the geocoding service:
        service.geocode({
          q: `${streetNumber} ${street} ${city}`
        }, (result) => {
          var filtered_items = chooseCorrectAddress(result.items);

          filtered_items.forEach((item) => {
            addDraggableMarker(map, behavior, item.position.lat, item.position.lng);
          });
        });
     } else {
        addDraggableMarker(map, behavior, initial_lat, initial_lon);
     }
  }

  $(document).ready(function() {
      is_view_building_change_form = $("#building_form").length

      if (is_view_building_change_form > 0) {
          initMap();
      }
  });
})(django.jQuery);