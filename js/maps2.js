// Crear el mapa
var map = L.map("map").setView([-16.649, -65.416], 6);

// Capa base de OpenStreetMap
var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// Capa base de Google Maps
var googleMaps = L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
}).addTo(map);


// Capa base de Imagen Satelital de Google
var googleSatellite = L.tileLayer("https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

//servicios wms
var url ="http://localhost:8080/geoserver/";

var municipios = L.tileLayer.wms(url+"visor_v1/wms?",
	{layers: "Municipios 5050",
	format:"image/png",
	transparent: true
}).addTo(map);

var Per_Comunidad = L.tileLayer.wms(url+"visor_v1/wms?",
	{layers: "ca_perimetros_aba1",
	format:"image/png",
	transparent: true
}).addTo(map);


var prod_Multiple = L.tileLayer.wms(url+"visor_v1/wms?",
	{layers: "ca_puntos_upas_2v",
	format:"image/png",
	transparent: true
});

var prod_campo = L.tileLayer.wms(url+"visor_v1/wms?",
    {layers: "Productores_Org_Campo",
    format:"image/png",
    transparent: true
});

//  GeoJSON
function styleMunicipios(feature) {
    return {
        fillColor: '#eeeeee',
        weight: 1,
        opacity: .8,
        color: 'red',
        fillOpacity: 0.2
    };
}

if (typeof json_departamentos_0 !== 'undefined') {
    var departamentos_0 = L.geoJson(json_departamentos_0, {
        style:styleMunicipios,
        attribution: '',
        interactive: false,
        layerName: 'Departamentos'        
    }).addTo(map);
    map.fitBounds(departamentos_0.getBounds());
} else {
    console.error('No se encontraron datos GeoJSON: departamentos_0');
}

// Se reconfiguro los controles de capa
var baseLayers = {
     "OpenStreetMap": osm,
    "Google Maps": googleMaps,
    "Google Satélite": googleSatellite
};
var overlayLayers = {};
if (typeof departamentos_0 !== 'undefined') {
    overlayLayers["Departamentos"] = departamentos_0;
    overlayLayers["Municipios"]    = municipios;
    overlayLayers["Perimetro Comunidad"] = Per_Comunidad;
	overlayLayers["Productores Marco Multiple"] = prod_Multiple;
    overlayLayers["Productores Campo"] = prod_campo;
	//overlayLayers["Comuni_2012"] = com_2012;
}

// Añadir control de capas al mapa
L.control.layers(baseLayers, overlayLayers).addTo(map);

// Añadir escala
L.control.scale().addTo(map);

// funcion que realiza zoom al departamento
  function zoomToDepartamento(codDep) {
    departamentos_0.eachLayer(function(layer) {
        if (layer.feature.properties.COD_DEP === codDep) {
            map.fitBounds(layer.getBounds(), {
                padding: [-50, -50],
            });
            // cambia color depto
            layer.setStyle({
                fillOpacity: 0.4,
                weight: 6,
                color: 'transparent',
            });
        } else {
            // Restablecer estilo para otros departamentos
            layer.setStyle({
                fillColor: '#eeeeee',
                weight: 1,
                opacity: .8,
                color: 'red',
                fillOpacity: 0.2
            });
        }
    });
  }
//funcion que controla el clic de los enlaces del menu       
function enlace(link,codigo) {
    const links = document.querySelectorAll('.side-menu a');
    links.forEach(l => l.style.backgroundColor = '#e0e0e0');
    link.style.backgroundColor = '#ccc';
    zoomToDepartamento(codigo);
  }