import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import NewParcelForm, { NewParcelModalForm }
  from '../../src/components/forms/newParcelForm.jsx';
import { props } from '../../__fixtures__/initialState';

const onChange = jest.fn();
const createNewParcel = jest.fn();
const mockStore = configureStore([thunk]);
const store = mockStore(props);
let wrapper;

describe('New parcel form', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Provider store={store}>
        <NewParcelForm />
      </Provider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('New parcel form', () => {
  beforeEach(() => {
    wrapper = mount(<NewParcelModalForm {...props}
      onChange={onChange} createNewParcel = { createNewParcel} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  it('should change state', () => {
    const input = wrapper.find('#parcelName');
    input.instance().value = 'Rice';
    input.simulate('change');
    expect(wrapper.state().parcelName).toEqual('Rice');
  });
  it('should simulate the onSubmit', () => {
    wrapper.find('form').simulate('submit');
    const input1 = wrapper.find('input').at(0);
    const input2 = wrapper.find('input').at(1);
    const textArea = wrapper.find('textarea');
    const input3 = wrapper.find('input').at(2);
    const input4 = wrapper.find('input').at(3);
    const input5 = wrapper.find('input').at(4);
    const input6 = wrapper.find('input').at(5);
    input1.simulate('change', { target: { value: 'Rice' } });
    input2.simulate('change', { target: { value: '10' } });
    textArea.simulate('change', { target: { value: 'Owerri' } });
    input3.simulate('change', { target: { value: 'yinks' } });
    input4.simulate('change', { target: { value: 'yinks@gmail.com' } });
    input5.simulate('change', { target: { value: '08129844567' } });
    input6.simulate('change', { target: { value: 'Yaba' } });
    expect(createNewParcel).toHaveBeenCalled();
  });
});
