import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { MemoryRouter, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import PrivateRoute from '../src/helpers/privateRoute';
import hasId from '../src/helpers/validator';
import Profile from '../src/components/profile.jsx';


const initialState1 = {
  auth: {
    isAuthenticated: false,
  }
};

const mockStore = configureStore([thunk]);

describe('Private Route component', () => {
  const store = mockStore(initialState1);
  it('renders correctly', () => {
    const tree = renderer
      .create(<MemoryRouter>
        <Provider store={store}><PrivateRoute /></Provider>
      </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Private Route component', () => {
  let privateRoute;
  it('redirects unauthenticated users', () => {
    const store = mockStore(initialState1);
    privateRoute = shallow(<MemoryRouter>
      <Provider store={store}><PrivateRoute /></Provider>
    </MemoryRouter>);
    const redirect = privateRoute.find(Redirect);
    expect(redirect).toBeDefined();
  });
  it('allows authenticated users', () => {
    const store = mockStore({
      auth: {
        isAuthenticated: true,
      }
    });
    privateRoute = shallow(<MemoryRouter>
      <Provider store={store}><PrivateRoute component={Profile} /></Provider>
    </MemoryRouter>);
    const component = privateRoute.find(Profile);
    expect(component).toBeDefined();
  });
});

describe('Has Id helper method', () => {
  it('should return true', () => {
    expect(hasId({ id: 1 })).toEqual(true);
  });
  it('should return false', () => {
    expect(hasId({ name: 'Tiku' })).toEqual(false);
  });
});
