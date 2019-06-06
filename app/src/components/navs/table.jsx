import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Pulse } from 'better-react-spinkit';

const tableHeading = (<tr id='table-head'>
  <th>ID</th>
  <th>Name</th>
  <th>Weight</th>
  <th>Price</th>
  <th>Destination</th>
  <th>Receiver</th>
  <th>Sent On</th>
  <th>Status</th>
</tr>);

const style = {
  display: 'flex',
  justifyContent: 'center'
};

const mapParcels = parcels => parcels.map((parcel, index) => (
    <tr key={index}>
      <td>PO{parcel.id}</td>
      <td>{parcel.parcelname}</td>
      <td>{parcel.weight}</td>
      <td>{parcel.price}</td>
      <td>{parcel.destination}</td>
      <td>{parcel.receiver}</td>
      <td>{parcel.senton}</td>
      <td>{parcel.status}</td>
      <td>
        <Link to={`/details/${parcel.id}`} className='btn xsm bg-bright-blue white'>
          View
          </Link>
      </td>
    </tr>
));

export const ParcelTable = ({
  parcelText,
  parcels, isLoading
}) => <div className='dash-cont'>
    <div id='table-info'>
     <a href='#'>{parcelText}</a>
    </div>
    <div id='table-cont'>
      {isLoading
        ? (<div style={style}><Pulse color='rgb(255,69,0)' size={100} /></div>)
        : parcels.length < 1
          ? (<h1 style={style}>No Parcel Orders</h1>)
          : (<table><tbody>{tableHeading}{mapParcels(parcels)}</tbody></table>)}
    </div>
  </div>;

ParcelTable.propTypes = {
  parcels: PropTypes.array,
  isLoading: PropTypes.bool,
  parcelText: PropTypes.string
};
