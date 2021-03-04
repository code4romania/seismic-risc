const { H } = window;

const makeMarkerIcon = (category) => {
  let className = 'marker selected';
  if (category) className = `marker-${category.toLowerCase()}`;

  const markerSvg =
    `<div class="${className}">` +
    `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">` +
    `<circle style="" cx="12.43" cy="8.37" r="8.107"/>` +
    `<path style="" transform="matrix(0.033909, 0.021505, -0.022542, 0.035546, 11.993942, -9.750627)" d="M 176 536 A 303.401 303.401 0 0 1 452 358.599 L 452 662 Z"/>` +
    `<text style="fill: rgb(255, 249, 249); font-size: 7.9px; white-space: pre; text-anchor: middle;" x="12" y="11.114">${
      category ? category.toUpperCase() : ''
    }</text>` +
    `</svg></div>`;

  return new H.map.DomIcon(markerSvg);
};

export default {
  buildClusterLayer: (data, onClusterClick, onNoiseClick) => {
    const dataPoints = data.map((item) => {
      return new H.clustering.DataPoint(item.lat, item.lng, 1, item);
    });
    const clusteredDataProvider = new H.clustering.Provider(dataPoints, {
      clusteringOptions: {
        eps: 32,
        minWeight: 3,
      },
    });
    const defaultTheme = clusteredDataProvider.getTheme();
    const customTheme = {
      getClusterPresentation: (cluster) => {
        const clusterMarker = defaultTheme.getClusterPresentation.call(defaultTheme, cluster);
        return clusterMarker;
      },
      getNoisePresentation: (noisePoint) => {
        const riskCategory = noisePoint.getData().risk_category;
        const icon = makeMarkerIcon(riskCategory);
        const noiseMarker = new H.map.DomMarker(noisePoint.getPosition(), {
          icon,
          min: noisePoint.getMinZoom(),
        });
        noiseMarker.setData(noisePoint);
        return noiseMarker;
      },
    };
    clusteredDataProvider.setTheme(customTheme);
    clusteredDataProvider.addEventListener('tap', (event) => {
      if (event.target.getData().getData) {
        onNoiseClick(event.target);
      } else {
        onClusterClick(event.target);
      }
    });
    return new H.map.layer.ObjectLayer(clusteredDataProvider);
  },
  unhighlightMarker: (marker) => {
    marker.setIcon(makeMarkerIcon(marker.getData().getData().risk_category));
  },
  highlightMarker: (marker) => {
    marker.setIcon(makeMarkerIcon());
  },
};
