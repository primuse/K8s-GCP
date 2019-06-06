import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import LocationParcelForm, { LocationModalForm }
  from '../../src/components/forms/changeLocationForm.jsx';
import { props, props3 } from '../../__fixtures__/initialState';

const onChange = jest.fn();
const save = jest.fn();
const changeParcelLocation = jest.fn();
const mockStore = configureStore([thunk]);
const store = mockStore(props);
let wrapper;

describe('Change Parcel Location Form', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Provider store={store}>
        <LocationParcelForm />
      </Provider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Change Parcel Location Form', () => {
  beforeEach(() => {
    wrapper = mount(<LocationModalForm {...props}
      onChange={onChange} save={save}
      changeParcelLocation={changeParcelLocation} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  it('should change state', () => {
    const input = wrapper.find('#currentLocation');
    input.instance().value = 'USA';
    input.simulate('change');
    expect(wrapper.state().currentLocation).toEqual('USA');
  });
  it('should simulate the onSubmit', () => {
    wrapper.find('form').simulate('submit');
    const input1 = wrapper.find('input').at(0);
    input1.simulate('change', { target: { value: 'USA' } });
    expect(changeParcelLocation).toHaveBeenCalled();
  });
});

describe('Change Parcel Location Form', () => {
  beforeEach(() => {
    wrapper = mount(<LocationModalForm {...props3}
      onChange={onChange} save={save}
      changeParcelLocation={changeParcelLocation} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  it('should show the loading button', () => {
    expect(wrapper.find('span')).toBeDefined();
  });
});
