import { useEffect, useRef, useState } from 'react';
import ClusterLayerBuilder from './ClusterLayerBuilder';

const { H } = window;

export default function useDecoratedClusteredMap(currentMap, points) {
  const [buildingDetails, setBuildingDetails] = useState(undefined);
  const [detailsOpen, setDetailsOpen] = useState(false);
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
    setBuildingDetails(undefined);
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
    setDetailsOpen(buildingDetails !== undefined);
  }, [buildingDetails]);

  useEffect(() => {
    if (!currentMap || !zoom) {
      return;
    }
    currentMap.getViewPort().resize();
    if (selectedMarker) {
      const position = { ...selectedMarker.getData().getPosition() };
      currentMap.getViewModel().setLookAtData({ position, zoom }, true);
    }
  }, [detailsOpen]);

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
      setBuildingDetails(undefined);
      clearMap();
      currentMap.addLayer(
        ClusterLayerBuilder.buildClusterLayer(points, onClusterClick, onNoiseClick),
      );
    }
  }, [points, currentMap]);

  return { buildingDetails, onSelectBuilding, onHideBuilding };
}
