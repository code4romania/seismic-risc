// Elements that make up the sidebar.
var content = document.getElementById('sidebar-content');
var closer = document.getElementById('sidebar-closer');
var sidebar = document.getElementById('sidebar');
// Map Div
var mapDiv = document.getElementById("map");

// TODO: replace center of Bucharest with center of Romania
// Geographical center of Romania, Dealu Frumos, SB
//var center = [24.685850, 45.985618]

// Center of Bucharest, Piata Universitatii
var center = [26.102, 44.435];

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat(center),
        zoom: 12
    })
});

// Add a click handler to hide the sidebar.
closer.onclick = function() {

    sidebar.style.display = "none";

    mapDiv.classList.add('col-md-12');

    closer.blur();

    return false;
};

function extract(input_array, output_array, filter) {

    for (var i = 0, len = input_array.length; i < len; i++) {

        item = input_array[i];

        if (filter === null || filter === item.fields.risk_category) {
            var _fields = {};
            _fields = item.fields;
            _fields.pk = item.pk;

            output_array.push(item.fields);
        }

    }
}

function plot_buildings(filter = null) {

    var request = new XMLHttpRequest()
    var locations = [];

    request.open('GET', 'http://127.0.0.1:8000/api/buildings', true)

    request.onload = function() {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);


        if (request.status >= 200 && request.status < 400) {


            extract(data, locations, filter);
            locations.forEach(processLocations);

        } else {
            console.log('error')
        }
    }

    request.send()
}

plot_buildings();

function createStyle(risk_category) {

    var iconColor;

    switch (risk_category) {
        case "Rs I":
            iconColor = "#400000"
            break;
        case "Rs II":
            iconColor = "#600000"
            break;
        case "Rs III":
            iconColor = "#800000"
            break;
        case "Rs IV":
            iconColor = "#ff8080"
            break;
        case "U1":
            iconColor = "#aa4400"
            break;
        case "U2":
            iconColor = "#ff6600"
            break;
        case "U3":
            iconColor = "#ff9955"
            break;
        case "U4":
            iconColor = "#ffb380"
            break;
        default:
            iconColor = "#ac9393"
    }

    return new ol.style.Style({
        image: new ol.style.Circle({
                radius: 12,
                stroke: new ol.style.Stroke({
                    color: "#fff"
                }),
                fill: new ol.style.Fill({
                    color: iconColor // attribute colour
                })
            })
            /*,
                        text: new ol.style.Text({
                            text: risk_category,
                            font: '10px Calibri,sans-serif',
                            fill: new ol.style.Fill({
                                color: '#fff'
                            })
                        }) */


    });

}

// get a style (color + text) based on category
function getStyle(risk_category) {

    // stores styles so we only create them once per category
    mapStyles = {
        rs1: createStyle("Rs I"),
        rs2: createStyle("Rs II"),
        rs3: createStyle("Rs III"),
        rs4: createStyle("Rs IV"),
        u1: createStyle("U1"),
        u2: createStyle("U2"),
        u3: createStyle("U3"),
        u4: createStyle("U4"),
        na: createStyle("N/A")
    };


    switch (risk_category) {
        case "Rs I":
            return mapStyles.rs1
        case "Rs II":
            return mapStyles.rs2
        case "Rs III":
            return mapStyles.rs3
        case "Rs IV":
            return mapStyles.rs4
        case "U1":
            return mapStyles.u1
        case "U2":
            return mapStyles.u2
        case "U3":
            return mapStyles.u3
        case "U4":
            return mapStyles.u4
        default:
            return mapStyles.na
    }
}

function processLocations(item, index) {

    marker = new ol.Feature({
        geometry: new ol.geom.Point(
            ol.proj.fromLonLat([item.lng, item.lat])
        ),
    });

    marker.setProperties(item);

    marker.setStyle(getStyle(item.risk_category));

    var vectorSource = new ol.source.Vector({
        features: [marker]
    });

    var markerVectorLayer = new ol.layer.Vector({
        source: vectorSource,
    });

    map.addLayer(markerVectorLayer);

}

map.on('click', function(evt) {

    mapDiv.classList.remove('col-md-12');
    mapDiv.classList.add('col-md-9');
    sidebar.classList.add('col-md-3');


    if (sidebar.style.display === "none") {
        sidebar.style.display = "block";
    }

    closer.style.display = "block";


    var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
        return feature;
    });

    if (feature) {
        var coord = feature.getGeometry().getCoordinates();
        var props = feature.getProperties();

        //console.log(props);

        var request = new XMLHttpRequest()

        request.open('GET', `http://127.0.0.1:8000/api/building/${props.pk}`, true)

        request.onload = function() {
            // Begin accessing JSON data here
            var data = JSON.parse(this.response);

            if (request.status >= 200 && request.status < 400) {

                result = data[0].fields

                content.innerHTML = `<ul>
                        <li><span class="detail-label">Adresă</span> ${result.address}  ${result.post_code} </li>
                        <li><span class="detail-label">Anul construcției</span> ${result.year_built} </li>
                        <li><span class="detail-label">Regim înălțime</span> ${result.height_regime}</li>
                        <li><span class="detail-label">Clasa de risc</span> ${result.risk_category} </li>
                        <li><span class="detail-label">Anul expertizei seismice</span> ${result.examination_year}
                        <li> <span class="detail-label">Observații</span> ${result.observations}</li>
                        <li> <span class="detail-label">Numele expertului atestat</span> ${result.certified_expert}</li>
                    </ul>`;

            } else {
                console.log('error')
            }
        }
        request.send()
    }
});

var rsall = document.getElementById("all")

rsall.classList.add("active");

let elementsArray = document.getElementsByClassName("filter-button");

Array.from(elementsArray).forEach(function(elem) {
    elem.addEventListener("click", function() {

        var layersOSM = new ol.layer.Group({
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ]
        });

        map.setLayerGroup(layersOSM);

        var elems = document.querySelectorAll(".active.filter-button");

        [].forEach.call(elems, function(el) {
            el.classList.remove("active");
        });

        elem.classList.add("active");

        var value;

        switch (elem.id) {
            case "rs1":
                value = "Rs I";
                break
            case "rs2":
                value = "Rs II";
                break
            case "rs3":
                value = "Rs III";
                break
            case "rs4":
                value = "Rs IV";
                break
            case "u1":
                value = "U1";
                break
            case "u2":
                value = "U2";
                break
            case "u3":
                value = "U3";
                break
            case "u4":
                value = "U4";
                break
            case "na":
                value = "n/a";
                break
            default:
                value = null;


        }

        plot_buildings(value);
    });
});
