import { useEffect, useRef, useState } from 'react';
import ClusterLayerBuilder from './ClusterLayerBuilder';

const { H } = window;

export default function useDecoratedClusteredMap(currentMap, points) {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [buildingDetails, setBuildingDetails] = useState(undefined);
  const [selectedMarker, setSelectedMarker] = useState(undefined);
  const [zoom, setZoom] = useState(undefined);

  const prevSelectedMarker = useRef();

  const onClusterClick = (marker) => {
    currentMap.getViewModel().setLookAtData(
      {
        position: marker.getData().getPosition(),
        zoom: currentMap.getZoom() + 2,
      },
      true,
    );
  };

  const onNoiseClick = (marker, zoomToSet = 15) => {
    const currentZoom = currentMap.getZoom();
    setZoom(currentZoom > zoomToSet ? currentZoom : zoomToSet);
    setSelectedMarker(marker);
    setBuildingDetails(marker.getData().getData());
    setDrawerVisible(true);
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

  const onSelectBuilding = (buildingDetail) => {
    const markers = currentMap
      .getLayers()
      .asArray()
      .filter((layer) => layer.getProvider().providesDomMarkers())
      .map((layer) => layer.getProvider().requestDomMarkers(calculateBounds(), 20));
    const foundMarker = markers
      .flat()
      .find(
        (marker) =>
          marker.getData().getData &&
          marker.getData().getData().general_id === buildingDetail.general_id,
      );
    if (foundMarker) {
      onNoiseClick(foundMarker, 20);
    }
  };

  const onHideBuilding = () => {
    setDrawerVisible(false);
    if (selectedMarker) {
      ClusterLayerBuilder.unhighlightMarker(selectedMarker);
      setSelectedMarker(undefined);
    }
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
    if (!currentMap || !selectedMarker || !zoom) {
      return;
    }
    if (isDrawerVisible) {
      const position = { ...selectedMarker.getData().getPosition() };
      currentMap.getViewModel().setLookAtData({ position, zoom }, true);
    }
  }, [isDrawerVisible, selectedMarker]);

  useEffect(() => {
    if (prevSelectedMarker.current) {
      ClusterLayerBuilder.unhighlightMarker(prevSelectedMarker.current);
    }
    prevSelectedMarker.current = selectedMarker;
    if (selectedMarker) {
      ClusterLayerBuilder.highlightMarker(selectedMarker);
    }
  }, [selectedMarker]);

  useEffect(() => {
    if (currentMap) {
      setDrawerVisible(false);
      clearMap();
      const bounds = calculateBounds();
      currentMap.getViewModel().setLookAtData({ bounds, zoom: 10 }, true);
      currentMap.addLayer(
        ClusterLayerBuilder.buildClusterLayer(points, onClusterClick, onNoiseClick),
      );
    }
  }, [points, currentMap]);

  return { isDrawerVisible, buildingDetails, onSelectBuilding, onHideBuilding };
}
