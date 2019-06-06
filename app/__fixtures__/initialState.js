export const props = {
  auth: {
    isLoading: false,
    isAuthenticated: true,
    user: {
      firstName: 'Tiku',
      lastName: 'Okoye',
      registered: '22-03-2019',
      email: 'cim@gmail.com',
      isadmin: false
    }
  },
  parcel: {
    parcels: [
      {
        id: '1',
        parcelName: 'rice',
        weigth: '30',
        price: '4,000',
        destination: 'Owerri',
        receiver: 'Tiku Okoye',
        senton: '22-03-2019',
        status: 'created'
      },
      {
        id: '1',
        parcelName: 'rice',
        weigth: '30',
        price: '4,000',
        destination: 'Owerri',
        receiver: 'Tiku Okoye',
        senton: '22-03-2019',
        status: 'created'
      }
    ],
    createdParcels: [],
    deliveredParcels: [],
    inTransitParcels: [],
    canceledParcels: [],
    isLoading: false,
    userParcel: {
      id: 2,
      parcelName: 'rice',
      weigth: '30',
      price: '4,000',
      destination: 'Owerri',
      receiver: 'Tiku Okoye',
      senton: '22-03-2019',
      status: 'created'
    }
  },
  setPassword: {
    emailSent: '',
    error: '',
    isLoading: false
  },
  users: {
    allUsers: [
      {
        id: '1',
        firstName: 'Tiku',
        lastName: 'Okoye',
        isadmin: 'false',
        email: 'cim@gmail.com',
        registered: '22-03-2019',
      },
      {
        id: '1',
        firstName: 'Tiku',
        lastName: 'Okoye',
        isadmin: 'false',
        email: 'cim@gmail.com',
        registered: '22-03-2019',
      }
    ],
    show: false
  },
  user: {
    firstName: 'Tiku',
    lastName: 'Okoye',
    registered: '22-03-2019',
    email: 'cim@gmail.com',
    isadmin: false
  }
};

export const props2 = {
  auth: {
    isLoading: false,
    isAuthenticated: true,
    user: {
      firstName: 'Tiku',
      lastName: 'Okoye',
      registered: '22-03-2019',
      email: 'cim@gmail.com',
      isadmin: true
    }
  },
  parcel: {
    parcels: [
      {
        id: '1',
        parcelName: 'rice',
        weigth: '30',
        price: '4,000',
        destination: 'Owerri',
        receiver: 'Tiku Okoye',
        senton: '22-03-2019',
        status: 'created'
      },
      {
        id: '1',
        parcelName: 'rice',
        weigth: '30',
        price: '4,000',
        destination: 'Owerri',
        receiver: 'Tiku Okoye',
        senton: '22-03-2019',
        status: 'created'
      }
    ],
    createdParcels: [],
    deliveredParcels: [],
    inTransitParcels: [],
    canceledParcels: [],
    isLoading: false,
    userParcel: {
      id: 2,
      parcelName: 'rice',
      weigth: '30',
      price: '4,000',
      destination: 'Owerri',
      receiver: 'Tiku Okoye',
      senton: '22-03-2019',
      status: 'created'
    }
  },
  users: {
    allUsers: [
      {
        id: '1',
        firstName: 'Tiku',
        lastName: 'Okoye',
        isadmin: 'false',
        email: 'cim@gmail.com',
        registered: '22-03-2019',
      },
      {
        id: '1',
        firstName: 'Tiku',
        lastName: 'Okoye',
        isadmin: 'false',
        email: 'cim@gmail.com',
        registered: '22-03-2019',
      }
    ],
    show: false
  },
  setPassword: {
    emailSent: '',
    error: '',
    isLoading: false
  },
  user: {
    firstName: 'Tiku',
    lastName: 'Okoye',
    registered: '22-03-2019',
    email: 'cim@gmail.com',
    isadmin: true
  }
};

export const props3 = {
  parcel: {
    isLoading: true
  }
};
