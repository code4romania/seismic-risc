/* eslint-disable max-classes-per-file */
window.H = {
  service: {},
  ui: {},
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
};

window.H.mapevents = class {};

window.H.mapevents.MapEvents = class {};

window.H.mapevents.Behavior = class {};

window.H.ui.UI = class {};

window.H.ui.UI.createDefault = class {};
