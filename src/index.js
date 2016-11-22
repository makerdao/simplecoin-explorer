import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import '../design/assets/bootstrap/css/bootstrap.min.css';
import '../design/assets/fonts/ionicons.min.css';
import './styles.min.css';
import '../design/assets/js/jquery.min';
window.jQuery = window.$ =  require('../design/assets/js/jquery.min');
require('../design/assets/bootstrap/js/bootstrap.min');

import './tokens';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
