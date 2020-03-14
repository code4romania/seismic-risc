import React from 'react';
import ReactDOM from 'react-dom';
import SocialBar from './SocialBar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SocialBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
