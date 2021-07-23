const { H } = window;

const HereMapDomIconFactory = {
  makeMarkerIcon: (category) => {
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
  },
};

export default HereMapDomIconFactory;
