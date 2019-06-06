import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Profile from '../../../src/components/navs/profile.jsx';
import { props } from '../../../__fixtures__/initialState';

describe('Profile Page component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Profile user={props.user} parcel={props.parcel} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
