import React from 'react';
import ReactDOM from 'react-dom';
import 'materialize-css/dist/css/materialize.min.css';

class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

const mountNode = document.getElementById('app');
ReactDOM.render(<HelloMessage name='World!' />, mountNode);