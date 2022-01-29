const { H } = window;

const HereMapDomIconFactory = {
  makeMarkerIcon: (category) => {
    let className = 'marker selected';
    if (category) className = `marker-${category.toLowerCase().split('/').join('')}`;

    const markerSvg =
      `<div class="${className}">` +
      `<svg width="34" height="39" viewBox="0 0 34 39"xmlns="http://www.w3.org/2000/svg">` +
      `<path d="M28.314 28.3134L19.828 36.7994C19.4569 37.1709 19.0162 37.4656 18.5311 37.6667C18.046 37.8677 17.5261 37.9712 17.001 37.9712C16.4759 37.9712 15.956 37.8677 15.4709 37.6667C14.9858 37.4656 14.5451 37.1709 14.174 36.7994L5.686 28.3134C3.44845 26.0757 1.92468 23.2248 1.30738 20.1211C0.690082 17.0175 1.00698 13.8004 2.21801 10.8769C3.42904 7.95331 5.4798 5.4545 8.11097 3.69643C10.7421 1.93836 13.8355 1 17 1C20.1645 1 23.2579 1.93836 25.889 3.69643C28.5202 5.4545 30.571 7.95331 31.782 10.8769C32.993 13.8004 33.3099 17.0175 32.6926 20.1211C32.0753 23.2248 30.5516 26.0757 28.314 28.3134Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<text style="fill: rgb(255, 249, 249); font-size: 12px; white-space: pre; text-anchor: middle; font-weight: 700; user-select: none;" x="17" y="20">${
        category ? category.toUpperCase() : ''
      }</text>` +
      `</svg></div>`;

    return new H.map.DomIcon(markerSvg);
  },
};

export default HereMapDomIconFactory;
