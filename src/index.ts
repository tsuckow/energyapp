import ReactDOM from 'react-dom';
import { createElement } from 'react';

import { App } from './App'; 

const root = document.createElement('div');
root.id = 'root';
document.body.append(root);

ReactDOM.render(createElement(App), root);