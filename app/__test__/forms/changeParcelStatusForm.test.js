import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import StatusParcelForm, { StatusModalForm }
  from '../../src/components/forms/changeParcelStatusForm.jsx';
import { props, props3 } from '../../__fixtures__/initialState';

const onChange = jest.fn();
const save = jest.fn();
const changeParcelStatus = jest.fn();
const mockStore = configureStore([thunk]);
const store = mockStore(props);
let wrapper;

describe('Change Parcel Status Form', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Provider store={store}>
        <StatusParcelForm />
      </Provider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Change Parcel Status Form', () => {
  beforeEach(() => {
    wrapper = mount(<StatusModalForm {...props}
      onChange={onChange} save={save}
      changeParcelStatus={changeParcelStatus} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  it('should change state', () => {
    const input = wrapper.find('#status');
    input.instance().value = 'Delivered';
    input.simulate('change');
    expect(wrapper.state().status).toEqual('Delivered');
  });
  it('should simulate the onSubmit', () => {
    wrapper.find('form').simulate('submit');
    const input1 = wrapper.find('input').at(0);
    input1.simulate('change', { target: { value: 'Delivered' } });
    expect(changeParcelStatus).toHaveBeenCalled();
  });
});

describe('Change Parcel Status Form', () => {
  beforeEach(() => {
    wrapper = mount(<StatusModalForm {...props3}
      onChange={onChange} save={save}
      changeParcelStatus={changeParcelStatus} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  it('should show the loading button', () => {
    expect(wrapper.find('span')).toBeDefined();
  });
});
