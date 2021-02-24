import { useEffect, useState } from 'react';
import ClusterLayerBuilder from './ClusterLayerBuilder';

const { H } = window;

export default function useDecoratedClusteredMap(currentMap, points) {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [buildingDetails, setBuildingDetails] = useState(undefined);

  const onClusterClick = (marker) => {
    currentMap.getViewModel().setLookAtData(
      {
        position: marker.getPosition(),
        zoom: currentMap.getZoom() + 2,
      },
      true,
    );
  };

  const onNoiseClick = (marker) => {
    const position = { ...marker.getPosition() };
    position.lng += 0.006;
    currentMap.getViewModel().setLookAtData({ position, zoom: 15 }, true);
    if (!isDrawerVisible) {
      setDrawerVisible(true);
    }
    setBuildingDetails(marker.getData());
  };

  const handleMarkerClick = (marker) => {
    if (!marker.getData) {
      onClusterClick(marker);
    } else {
      onNoiseClick(marker);
    }
  };

  const calculateBounds = () => {
    if (points.length > 1) {
      const latitudes = points.map((p) => p.lat);
      const longitudes = points.map((p) => p.lng);
      return new H.geo.Rect(
        Math.max(...latitudes),
        Math.min(...longitudes),
        Math.min(...latitudes),
        Math.max(...longitudes),
      );
    }
    return undefined;
  };

  const clearMap = () => {
    currentMap
      .getLayers()
      .asArray()
      .forEach((layer) => {
        currentMap.removeLayer(layer);
      });
  };

  useEffect(() => {
    if (currentMap) {
      setDrawerVisible(false);
      clearMap();
      const bounds = calculateBounds();
      currentMap.getViewModel().setLookAtData({ bounds, zoom: 10 }, true);
      currentMap.addLayer(ClusterLayerBuilder.buildClusterLayer(points, handleMarkerClick));
    }
  }, [points, currentMap]);

  return { isDrawerVisible, buildingDetails, setDrawerVisible };
}
