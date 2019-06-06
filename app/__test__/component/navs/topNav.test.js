import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import TopNav from '../../../src/components/navs/topNav.jsx';
import { props } from '../../../__fixtures__/initialState';


const mockStore = configureStore([thunk]);
const store = mockStore(props);

describe('Top Nav component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MemoryRouter>
        <Provider store={store}>
          <TopNav />
        </Provider>
      </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Top nav component', () => {
  let topNav;
  beforeEach(() => {
    topNav = mount(<MemoryRouter>
      <Provider store={store}>
        <TopNav />
      </Provider>
    </MemoryRouter>);
  });
  afterEach(() => {
    topNav.unmount();
  });
  it('renders the Top Nav', () => {
    const toggle = topNav.find('#toggle');
    expect(toggle.length).toEqual(1);
    toggle.simulate('click');
  });
});
