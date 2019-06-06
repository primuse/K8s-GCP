import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { UserTable } from '../../../src/components/navs/userTable.jsx';
import { props } from '../../../__fixtures__/initialState';

describe('User Parcel Table component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MemoryRouter>
        <UserTable allUsers={props.users.allUsers} />
      </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
