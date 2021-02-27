const { H } = window;

const markerSvg =
  '  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">' +
  '    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/><path d="M0 0h24v24H0z" fill="none"/>' +
  '  </svg>';
const domIconMarkup = `<div class="marker">${markerSvg}</div>`;
const selectedDomIconMarkup = `<div class="marker selected">${markerSvg}</div>`;

export default {
  buildClusterLayer: (data, onClusterClick, onNoiseClick) => {
    const dataPoints = data.map((item) => {
      return new H.clustering.DataPoint(item.lat, item.lng, 1, item);
    });
    const icon = new H.map.DomIcon(domIconMarkup);
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
    const icon = new H.map.DomIcon(domIconMarkup);
    marker.setIcon(icon);
  },
  highlightMarker: (marker) => {
    const selectedIcon = new H.map.DomIcon(selectedDomIconMarkup);
    marker.setIcon(selectedIcon);
  },
};
