import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ConnectedSignupForm, { SignupForm }
  from '../../src/components/forms/signUpForm.jsx';
import { props } from '../../__fixtures__/initialState';

const onChange = jest.fn();
const signupUser = jest.fn();
const mockStore = configureStore([thunk]);
const store = mockStore(props);
let wrapper;

describe('Signup form', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Provider store={store}>
        <ConnectedSignupForm />
      </Provider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Signup form', () => {
  beforeEach(() => {
    wrapper = mount(<SignupForm {...props}
      onChange={onChange} signupUser={signupUser} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  it('should change state', () => {
    const input = wrapper.find('#firstName');
    input.instance().value = 'Tiku';
    input.simulate('change');
    expect(wrapper.state().firstName).toEqual('Tiku');
  });
  it('should simulate the onSubmit', () => {
    wrapper.find('form').simulate('submit');
    const input1 = wrapper.find('input').at(0);
    const input2 = wrapper.find('input').at(1);
    const input3 = wrapper.find('input').at(2);
    const input4 = wrapper.find('input').at(3);
    input1.simulate('change', { target: { value: 'Tiku' } });
    input2.simulate('change', { target: { value: 'Okoye' } });
    input3.simulate('change', { target: { value: 'cim@gmail.com' } });
    input4.simulate('change', { target: { value: 'cim23000' } });
    expect(signupUser).toHaveBeenCalled();
  });
});
