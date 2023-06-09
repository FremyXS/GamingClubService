import { Admin, Resource, ListGuesser, fetchUtils } from 'react-admin';
import { EquipmentCreate, EquipmentEdit, EquipmentList } from './components/settings/equipment-settings';
import { EquipmentsModelCreate, EquipmentsModelEdit, EquipmentsModelList } from './components/settings/equipments-model-settings';
import { PackageCreate, PackageEdit, PackageList } from './components/settings/package-settings';
import { ReservationCreate, ReservationEdit, ReservationList } from './components/settings/reservations-settings';
import authProvider from './halpers/authProvider';
import { Dashboard } from '@mui/icons-material';
import { nameRoles } from './commons/roles';
import simpleRestProvider from 'ra-data-simple-rest';
import MyChart from './components/charts/MyCharts';
import React from 'react';
import { UserCreate, UserEdit, UserList } from './components/settings/users-settings';

const httpClient = async (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider('http://localhost:8000', httpClient);

const App = () => (
  <Admin dashboard={Dashboard} dataProvider={dataProvider} authProvider={authProvider}>
    {permissions => (
      <>
        {permissions === nameRoles.admin &&
          <>
            <Resource name='equipments/equipment' list={EquipmentList} edit={EquipmentEdit} create={EquipmentCreate} />
            <Resource name='equipments/model' list={EquipmentsModelList} edit={EquipmentsModelEdit} create={EquipmentsModelCreate} />
            <Resource name='equipments/type' list={ListGuesser} />
            <Resource name='equipments/condition' list={ListGuesser}/>
            <Resource name='package' list={PackageList} edit={PackageEdit} create={PackageCreate} />
            <Resource name='users/user' list={UserList} edit={UserEdit} create={UserCreate} />
          </>
        }
        {permissions === nameRoles.manager &&
          <>
            <Resource title="Equipments" name='equipments/equipment' list={EquipmentList} edit={EquipmentEdit} create={EquipmentCreate} />
            <Resource name='package' list={PackageList} edit={PackageEdit} create={PackageCreate} />
            <Resource name='reservations/reservation' list={ReservationList} edit={ReservationEdit} create={ReservationCreate} />
            <Resource name='reservations/analytics' list={ListGuesser} />
            <Resource name='analytics' list={MyChart} />
          </>
        }
        {permissions === nameRoles.user &&
          <>
            <Resource name='package' list={ListGuesser} />
            <Resource name='reservations/reservation' list={ReservationList} edit={ReservationEdit} create={ReservationCreate} />
          </>
        }
      </>
    )}
  </Admin>
);

export default App;
