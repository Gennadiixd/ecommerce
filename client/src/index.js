import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
// TODO: rectify volnurability - in jwt token 
// can be easily modify from frontend !!!

// all authentifications shuld be through server !!!

ReactDOM.render(<Routes />, document.getElementById('root'));