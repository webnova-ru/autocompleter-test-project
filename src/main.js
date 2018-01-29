import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'components';
import './main.styl';

const appNode = document.querySelector('#app');
if (appNode) {
    ReactDOM.render(<App />, appNode);
}
