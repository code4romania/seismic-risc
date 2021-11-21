/* eslint-disable max-classes-per-file */
window.scrollTo = jest.fn();

window.H = {
  service: {},
  ui: {},
  map: {},
  clustering: {},
  geo: {},
};
window.H.service.Platform = class {
  createDefaultLayers = jest.fn().mockImplementation(() => ({
    vector: {
      normal: {
        map: {},
      },
    },
  }));
};

window.H.Map = class {
  dispose = jest.fn();

  getObjects = jest.fn();

  removeObjects = jest.fn();

  getViewModel = jest.fn(() => {
    return {
      setLookAtData: jest.fn(),
    };
  });

  addLayer = jest.fn();

  getLayers = jest.fn().mockReturnValue({
    asArray: () => [],
  });

  removeLayer = jest.fn();

  getEngine = jest.fn().mockReturnValue({
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
};

window.H.mapevents = class {};

window.H.mapevents.MapEvents = class {};

window.H.mapevents.Behavior = class {};

window.H.ui.UI = class {};

window.H.ui.UI.createDefault = class {};

window.H.map.DomIcon = class {};

window.H.map.layer = class {};

window.H.map.layer.ObjectLayer = class {};

window.H.clustering.Provider = class {
  getTheme = jest.fn();

  setTheme = jest.fn();

  addEventListener = jest.fn();
};

window.H.clustering.DataPoint = jest.fn().mockReturnValue(jest.fn());

window.H.geo.Rect = jest.fn().mockReturnValue(jest.fn());
