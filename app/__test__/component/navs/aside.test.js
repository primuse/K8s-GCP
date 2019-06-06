import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ConnectedAside from '../../../src/components/navs/aside.jsx';
import { props } from '../../../__fixtures__/initialState';

const mockStore = configureStore([thunk]);
const store = mockStore(props);
let wrapper;


describe('Aside nav component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MemoryRouter>
        <Provider store={store}>
          <ConnectedAside />
        </Provider>
      </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Aside Nav component', () => {
  beforeEach(() => {
    wrapper = mount(<MemoryRouter>
      <Provider store={store}><ConnectedAside /></Provider>
    </MemoryRouter>);
    wrapper.instance().showModal = jest.fn();
    wrapper.instance().closeModal = jest.fn();
  });
  afterEach(() => {
    wrapper.unmount();
  });
  it('should simulate the opening of the new parcel modal', () => {
    wrapper.update();
    const aTag = wrapper.find('a').at(2);
    aTag.simulate('click');
  });
});
