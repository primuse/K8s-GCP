import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Details from '../../src/components/details.jsx';
import { props } from '../../__fixtures__/initialState';

global.Headers = () => { };

const defaultProps = {
  match: { params: { parcelId: 1 } },
};

const mockStore = configureStore([thunk]);
const store = mockStore(props);


describe('Parcel details container component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MemoryRouter>
        <Provider store={store}>
          <Details {...defaultProps} />
        </Provider>
      </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
