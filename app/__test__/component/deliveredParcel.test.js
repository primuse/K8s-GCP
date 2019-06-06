import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import DeliveredParcel from '../../src/components/deliveredParcel.jsx';
import { props } from '../../__fixtures__/initialState';

global.Headers = () => { };
const mockStore = configureStore([thunk]);
const store = mockStore(props);


describe('Delivered Parcels component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MemoryRouter>
        <Provider store={store}>
          <DeliveredParcel />
        </Provider>
      </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
