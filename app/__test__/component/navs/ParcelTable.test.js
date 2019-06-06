import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { ParcelTable } from '../../../src/components/navs/table.jsx';
import { props } from '../../../__fixtures__/initialState';

describe('Parcel Table component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MemoryRouter>
        <ParcelTable parcels={props.parcel.parcels} />
      </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
