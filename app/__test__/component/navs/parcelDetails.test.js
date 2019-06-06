import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ParcelDetails from '../../../src/components/navs/parcelDetails.jsx';
import { props, props2 } from '../../../__fixtures__/initialState';

const mockStore = configureStore([thunk]);


describe('Parcel Details component', () => {
  const store = mockStore(props);
  it('renders correctly', () => {
    const tree = renderer
      .create(<Provider store={store}><ParcelDetails user={props.user }/></Provider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('User Parcel Details component', () => {
  const store = mockStore(props);
  let parcelDetails;
  beforeEach(() => {
    parcelDetails = mount(<Provider store={store}>
      <ParcelDetails user={props.user} />
      </Provider>);
  });
  afterEach(() => {
    parcelDetails.unmount();
  });
  it('renders the Parcel Details', () => {
    const h6 = parcelDetails.find('h6');
    expect(h6.length).toEqual(10);
    expect(parcelDetails.find('#parcel')).toBeDefined();
  });
  it('opens the change destination modal', () => {
    const aTag = parcelDetails.find('a').at(0);
    aTag.simulate('click');
  });
  it('opens the cancel parcel modal', () => {
    const aTag = parcelDetails.find('a').at(1);
    aTag.simulate('click');
  });
});

describe('Admin Parcel Details component', () => {
  const store = mockStore(props2);
  let parcelDetails;
  beforeEach(() => {
    parcelDetails = mount(<Provider store={store}>
      <ParcelDetails user={props2.user} />
    </Provider>);
  });
  afterEach(() => {
    parcelDetails.unmount();
  });
  it('renders the Parcel Details', () => {
    const h6 = parcelDetails.find('h6');
    expect(h6.length).toEqual(10);
    expect(parcelDetails.find('#parcel')).toBeDefined();
  });
  it('opens the change location modal', () => {
    const aTag = parcelDetails.find('a').at(0);
    aTag.simulate('click');
  });
  it('opens the change status modal', () => {
    const aTag = parcelDetails.find('a').at(1);
    aTag.simulate('click');
  });
});
