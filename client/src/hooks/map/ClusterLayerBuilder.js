import HereMapDomIconFactory from '../../components/HereMapDomIconFactory';

const { H } = window;

export default {
  buildClusterLayer: (data, onClusterClick, onNoiseClick) => {
    const dataPoints = data.map((item) => {
      return new H.clustering.DataPoint(item.lat, item.lng, 1, item);
    });
    const clusteredDataProvider = new H.clustering.Provider(dataPoints, {
      clusteringOptions: {
        eps: 32,
        minWeight: 15,
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
        const icon = HereMapDomIconFactory.makeMarkerIcon(riskCategory);
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
    marker.setIcon(HereMapDomIconFactory.makeMarkerIcon(marker.getData().getData().risk_category));
  },
  highlightMarker: (marker) => {
    marker.setIcon(HereMapDomIconFactory.makeMarkerIcon());
  },
};
