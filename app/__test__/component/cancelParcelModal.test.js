import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ConnectedCancelParcel,
{ CancelParcelModal } from '../../src/components/forms/cancelParcelModal.jsx';
import { props, props3 } from '../../__fixtures__/initialState';

const cancel = jest.fn();
const cancelParcel = jest.fn();


const mockStore = configureStore([thunk]);
const store = mockStore(props);
let wrapper;

describe('Cancel Modal', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Provider store={store}>
        <ConnectedCancelParcel />
      </Provider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Cancel Modal', () => {
  beforeEach(() => {
    wrapper = mount(<CancelParcelModal {...props}
      cancel={cancel} cancelParcel={cancelParcel} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  it('should simulate the onSubmit', () => {
    wrapper.find('form').simulate('submit');
    expect(cancelParcel).toHaveBeenCalled();
  });
});

describe('Cancel Modal', () => {
  beforeEach(() => {
    wrapper = mount(<CancelParcelModal {...props3}
      cancel={cancel} cancelParcel={cancelParcel} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  it('should show the loading button', () => {
    expect(wrapper.find('span')).toBeDefined();
  });
});
