import React from 'react';
import ReactDOM from 'react-dom';
// import 'materialize-css/dist/css/materialize.min.css';

import btn from './styles.css';

class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        <div>
          Hello {this.props.name}
        </div>
        <button className={btn.red}>
          Button test
        </button>
      </div>
    )
  }
}

const mountNode = document.getElementById('app');
ReactDOM.render(<HelloMessage name='World!' />, mountNode);