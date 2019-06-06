import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Modal from '../../src/components/modal.jsx';
import { props } from '../../__fixtures__/initialState';

global.Headers = () => { };
const mockStore = configureStore([thunk]);
const store = mockStore(props);

const form = () => <div></div>;


describe('Modal component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MemoryRouter>
        <Provider store={store}>
          <Modal modalTitle={'New Parcel'} ModalForm={form} />
        </Provider>
      </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
