import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import DestinationParcelForm, { DestinationModalForm }
  from '../../src/components/forms/changeDestinationForm.jsx';
import { props, props3 } from '../../__fixtures__/initialState';

const onChange = jest.fn();
const save = jest.fn();
const changeParcelDestination = jest.fn();
const mockStore = configureStore([thunk]);
const store = mockStore(props);
let wrapper;

describe('Change Parcel Destination Form', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Provider store={store}>
        <DestinationParcelForm />
      </Provider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Change Parcel Destination Form', () => {
  beforeEach(() => {
    wrapper = mount(<DestinationModalForm {...props}
      onChange={onChange} save={save}
      changeParcelDestination={changeParcelDestination} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  it('should change state', () => {
    const input = wrapper.find('#destination');
    input.instance().value = 'USA';
    input.simulate('change');
    expect(wrapper.state().destination).toEqual('USA');
  });
  it('should simulate the onSubmit', () => {
    wrapper.find('form').simulate('submit');
    const input1 = wrapper.find('input').at(0);
    input1.simulate('change', { target: { value: 'USA' } });
    expect(changeParcelDestination).toHaveBeenCalled();
  });
});

describe('Change Parcel Destination Form', () => {
  beforeEach(() => {
    wrapper = mount(<DestinationModalForm {...props3}
      onChange={onChange} save={save}
      changeParcelDestination={changeParcelDestination} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  it('should show the loading button', () => {
    expect(wrapper.find('span')).toBeDefined();
  });
});
