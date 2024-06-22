// --------------
// Add Custom Maker
// --------------
// var myLatlngX = new google.maps.LatLng(22.3099681, 114.2209543);
// var marker = new google.maps.Marker({
	// position: myLatlngX,
	// map: map,
	// icon: iconBase
// });

// --------------
// Add Button
// --------------
// function zoomIn(controlDiv, map) {
	// var controlUI = document.createElement('div');
	// controlUI.style.backgroundImage = option.czInBg;
	// controlUI.style.height = option.czHeight + 'px';
	// controlUI.style.width = option.czWidth + 'px';
	// controlUI.style.marginTop = option.czInMarginTop + 'px';
	// controlUI.style.marginLeft = option.czInMarginLeft + 'px';
	// controlUI.style.cursor = 'pointer';
	// controlUI.title = 'Zoom In';	
	// controlDiv.appendChild(controlUI);
	// google.maps.event.addDomListener(controlUI, 'click', function() {
	  // map.setZoom(map.getZoom() + 1);			 
	// });
// }


(function ($) {
    $.fn.customMap = function (option) {
		// default
        var defaults = {
            'mapName': $(this).attr('id'),
			'mapStartX': '22.3595824',
			'mapStartY': '114.0007844',
			'mapZoom': 11,
			'mapStyle': '',
			'mapTypeControl':false,
			'streetViewControl':false,
			'zoomControl':false,
			'panControl':false,
			'scaleControl':false,
			'overviewMapControl':false,
			'rotateControl':true,			
			'mapMarker': '',			
			'infoBox': false,
			'customZoom': false,
			'czWidth': '50px',
			'czHeight': '50px',
			'scrollwheel': true,
			'isMobile': 0
        };
		
		// option
        var option = $.extend({}, defaults, option);
		var mapName = option.mapName;		
		var posX = option.mapStartX;		
		var posY = option.mapStartY;		
		var myLatlng = new google.maps.LatLng(posX, posY);
		var mapOptions = {
			zoom: option.mapZoom,
			center: myLatlng,
			mapTypeControl: option.mapTypeControl,
			streetViewControl: option.streetViewControl,
			zoomControl: option.zoomControl,
			panControl: option.panControl,
			scaleControl: option.scaleControl,
			overviewMapControl: option.overviewMapControl,
			rotateControl: option.rotateControl,
			scrollwheel: option.scrollwheel
		}
		var isMobile = option.isMobile;
		
		
		
		var map = new google.maps.Map(document.getElementById(mapName), mapOptions);		
		var styles = option.mapStyle;
		map.setOptions({styles: styles});
		if(isMobile == 0){
			map.panBy(150, 50);	
		}
			
		
	// ---------------------------------			
	// MARKER
	// ---------------------------------
		var iconBase = option.mapMarker;
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			icon: iconBase
		});


	// ---------------------------------			
	// BUTTON
	// ---------------------------------	
		
		// ----- create customZoom -----
		
		if (option.customZoom == true ) {			
		
			function zoomIn(controlDiv, map) {

				var controlUI = document.createElement('div');
				controlUI.style.backgroundImage = option.czInBg;
				controlUI.style.height = option.czHeight + 'px';
				controlUI.style.width = option.czWidth + 'px';
				controlUI.style.marginTop = option.czInMarginTop + 'px';
				controlUI.style.marginLeft = option.czInMarginLeft + 'px';
				controlUI.style.cursor = 'pointer';
				controlUI.title = 'Zoom In';
				
				controlDiv.appendChild(controlUI);

				// Setup click-event listener
				google.maps.event.addDomListener(controlUI, 'click', function() {
				  map.setZoom(map.getZoom() + 1);			 
				});
			}
			
			function zoomOut(controlDiv, map) {
				var controlUI = document.createElement('div');
				controlUI.style.backgroundImage = option.czOutBg;
				controlUI.style.height = option.czHeight + 'px';
				controlUI.style.width = option.czWidth + 'px';
				controlUI.style.marginTop = option.czOutMarginTop + 'px';
				controlUI.style.marginLeft = option.czOutMarginLeft + 'px';
				controlUI.style.cursor = 'pointer';
				controlUI.title = 'Zoom Out';
				controlDiv.appendChild(controlUI);

				// Setup click-event listener
				google.maps.event.addDomListener(controlUI, 'click', function() {
				  map.setZoom(map.getZoom() - 1);			 
				});
			}	

		}

			
		// ----- create InfoBox -----
		if (option.infoBox == true ) {			
			var boxOptions = option.infoBoxStyle;

			// open InfoBox at start
			var infoWindow = new InfoBox(boxOptions);
			if ( $(window).width() > 768 ) {
				infoWindow.open(map, marker);
			}

			// open InfoBox on click
			google.maps.event.addListener(marker, 'click', function() {			
				// infoWindow.setContent(boxText);
				infoWindow.open(map, marker);	
			});
		}
		
		// Create a DIV for controls
		function initialize() {	
			var czDiv = document.createElement('div');
			if (option.customZoom == true ) {	
			console.log(option.customZoom);		
			var czMinus = new zoomOut(czDiv, map);		
				var czPlus = new zoomIn(czDiv, map);
				
			}
			//  Set controls position				
			map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(czDiv);
		}

		google.maps.event.addDomListener(window, 'load', initialize);		
		
    };
}(jQuery));