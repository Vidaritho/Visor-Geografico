//crear un objeto mapa
var map = L.map("map").setView([-16.649,-65.416], 6);
//enlazar el mapa base del open streetmap al geoportal

var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

//servicios wms
// var municipios = L.tileLayer.wms("http://localhost:8080/geoserver/portal_rivera/wms?",
// 	{layers: "pg_Municipios_5050",
// 	format:"image/png",
// 	transparent: true
// }).addTo(map);

// var capitales = L.tileLayer.wms("http://localhost:8080/geoserver/portal_rivera/wms?",
// 	{layers: "pg_Capital_de_Municipio",
// 	format:"image/png",
// 	transparent: true
// }).addTo(map);


// var comunidades = L.tileLayer.wms("http://localhost:8080/geoserver/portal_rivera/wms?",
// 	{layers: "pg_Comunidades_Censo_2012",
// 	format:"image/png",
// 	transparent: true
// });

// geojson


//var com_2012 = L.geoJson.ajax("http://localhost:8080/geoserver/portal_rivera/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=portal_rivera%3Apg_gj_Com_2012&maxFeatures=50&outputFormat=application%2Fjson",{dataType:"jsonp"}).addTo(map);
// Asegúrate de que el mapa esté inicializado
//var map = L.map('map').setView([-16.649, -65.416], 6);




//controlador de capas

var osm = {
	"openstreetmap": osm,
	
};

// var overlayer = {
// 	"Municipios": municipiosLayer,
// //	"Capitales de Municipios": capitales,
// //	"Comunidades 2012" : comunidades
// //	"Comuni_2012" : com_2012
// };

L.control.layers(osm,layer_municipios_ds5050_0).addTo(map);

//escala

var escala = L.control.scale().addTo(map);


