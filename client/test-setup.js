import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

Enzyme.configure({ adapter: new Adapter() });

require.extensions['.svg'] = () => {};
global.shallow = shallow;
global.render = render;
global.mount = mount;

const API_ENDPOINT = 'http://localhost';
axios.defaults.host = API_ENDPOINT;
axios.defaults.adapter = httpAdapter;
