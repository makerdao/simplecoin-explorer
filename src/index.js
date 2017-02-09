import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import '../public/assets/bootstrap/css/bootstrap.min.css';
import '../public/assets/fonts/ionicons.min.css';
import './styles.min.css';
import '../public/assets/js/jquery.min';
window.jQuery = window.$ =  require('../public/assets/js/jquery.min');
require('../public/assets/bootstrap/js/bootstrap.min');

import './tokens';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
