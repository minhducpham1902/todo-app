import React from 'react';
import App from './App';
import ReactDom from 'react-dom'; 

it('renders withour crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<App />, div);
  ReactDom.unmountComponentAtNode(div);
}
)