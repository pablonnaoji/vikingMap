<body>
    <div id="map"></div>
    <div id="right-panel">
    <div>
    <h1>The Viking Map</h1>
    <b>Start:</b>
    <select id="begin">
      <option value="London, UK">London, UK</option>
    </select>
    <br>
    <b>Please Add the following destinations:</b> <br>
    <i>(Ctrl+Click or Cmd+Click to add the following selections)</i> <br>
    <select multiple id="add">
      <option value="paris, france">paris, france</option>
      <option value="amsterdam, netherlands">amsterdam, netherlands</option>
    </select>
    <br>
    <b>End:</b>
    <select id="destination">    
      <option value="Rome,ItalyC">Rome, Italy</option>
    </select>
    <br>
      <input type="submit" id="submit">
    </div>
    <div id="directions-panel"></div>
    </div>
     </body>
      <script>

      function initializeMap() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 6,
          center: {lat: 34.05, lng: -118.24}
        });
        directionsDisplay.setMap(map);

        document.getElementById('submit').addEventListener('click', function() {
          calcAndShowRoute(directionsService, directionsDisplay);
        });
      }

      function calcAndShowRoute(directionsService, directionsDisplay) {
        var waypts = [];
        var checkboxArray = document.getElementById('add');
        for (var i = 0; i < checkboxArray.length; i++) {
          if (checkboxArray.options[i].selected) {
            waypts.push({
              location: checkboxArray[i].value,
              stopover: true
            });
          }
        }

        directionsService.route({
          origin: document.getElementById('begin').value,
          destination: document.getElementById('destination').value,
          waypoints: waypts,
          optimizeWaypoints: true,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var infoBox = document.getElementById('directions-panel');
            infoBox.innerHTML = '';
            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {
              var pathSegment = i + 1;
              infoBox.innerHTML += '<b>Stop: ' + pathSegment +
                  '</b><br>';
              infoBox.innerHTML += route.legs[i].start_address + ' to ';
              infoBox.innerHTML += route.legs[i].end_address + '<br>';
              infoBox.innerHTML += route.legs[i].distance.text + '<br><br>';
            }
          } else {
            window.alert('Failed due to ' + status);
          }
        });
      }
      </script>
           <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCjVhON5OgMW8NzNWKxQJXYADETkdixle8&callback=initializeMap">
</script>
