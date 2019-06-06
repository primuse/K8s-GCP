import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import InTransitParcel from '../../src/components/inTransitParcel.jsx';
import { props } from '../../__fixtures__/initialState';

global.Headers = () => { };
const mockStore = configureStore([thunk]);
const store = mockStore(props);


describe('In-transit Parcels component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MemoryRouter>
        <Provider store={store}>
          <InTransitParcel />
        </Provider>
      </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
