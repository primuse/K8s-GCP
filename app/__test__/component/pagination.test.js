import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Pagination from '../../src/components/pagination.jsx';
import { props } from '../../__fixtures__/initialState';

global.Headers = () => { };
const mockStore = configureStore([thunk]);
const store = mockStore(props);
const action = jest.fn();
let wrapper;


describe('Pagination Component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MemoryRouter>
        <Provider store={store}>
          <Pagination />
        </Provider>
      </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});


describe('Pagination component', () => {
  beforeEach(() => {
    wrapper = mount(<MemoryRouter>
      <Provider store={store}>
        <Pagination action={action} pages={2} />
      </Provider>
    </MemoryRouter>);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  it('should render pagination links', () => {
    const links = wrapper.find('a');
    expect(links.length).toEqual(2);
  });
  it('should render the next page', () => {
    const link = wrapper.find('a').at(0);
    link.simulate('click');
    expect(action).toHaveBeenCalled();
  });
});
