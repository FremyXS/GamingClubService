import logo from './logo.svg';
import { Admin, Resource, ListGuesser, fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import './App.css';
import { EquipmentCreate, EquipmentEdit, EquipmentList } from './components/settings/equipment-settings';
import { EquipmentsModelCreate, EquipmentsModelEdit, EquipmentsModelList } from './components/settings/equipments-model-settings';
import { EquipmentsTypeCreate, EquipmentsTypeEdit, EquipmentsTypeList } from './components/settings/equipments-type-settings';
import { EquipmentsConditionCreate, EquipmentsConditionEdit, EquipmentsConditionList } from './components/settings/equipments-condition-settings';
import { PackageCreate, PackageEdit, PackageList } from './components/settings/package-settings';
import { ReservationCreate, ReservationEdit, ReservationList } from './components/settings/reservations-settings';
import { ReservationStatusList } from './components/settings/reservations-status-settings';
import authProvider from './halpers/authProvider';
import { Dashboard } from '@mui/icons-material';
import { nameRoles, roles } from './commons/roles';
import simpleRestProvider from 'ra-data-simple-rest';

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
            <Resource title="Equipments" name='equipments/equipment' list={EquipmentList} edit={EquipmentEdit} create={EquipmentCreate} />
            <Resource name='equipments/model' list={EquipmentsModelList} edit={EquipmentsModelEdit} create={EquipmentsModelCreate} />
            <Resource name='equipments/type' list={EquipmentsTypeList} edit={EquipmentsTypeEdit} create={EquipmentsTypeCreate} />
            <Resource name='equipments/condition' list={EquipmentsConditionList} edit={EquipmentsConditionEdit} create={EquipmentsConditionCreate} />
            <Resource name='package' list={PackageList} edit={PackageEdit} create={PackageCreate} />
            <Resource name='reservations/reservation' list={ReservationList} edit={ReservationEdit} create={ReservationCreate} />
            <Resource name='reservations/status' list={ReservationStatusList} />
          </>
        }
        {permissions === nameRoles.manager &&
          <>
            <Resource title="Equipments" name='equipments/equipment' list={EquipmentList} edit={EquipmentEdit} create={EquipmentCreate} />
            <Resource name='equipments/model' list={EquipmentsModelList} />
            <Resource name='equipments/type' list={EquipmentsTypeList} />
            <Resource name='equipments/condition' list={EquipmentsConditionList} />
            <Resource name='package' list={PackageList} edit={PackageEdit} create={PackageCreate} />
            <Resource name='reservations/reservation' list={ReservationList} edit={ReservationEdit} create={ReservationCreate} />
            <Resource name='reservations/status' list={ReservationStatusList} />
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
    {/* 
    <Resource title="Equipments" name='equipments/equipment' list={EquipmentList} edit={EquipmentEdit} create={EquipmentCreate} />
    <Resource name='equipments/model' list={EquipmentsModelList} edit={EquipmentsModelEdit} create={EquipmentsModelCreate} />
    <Resource name='equipments/type' list={EquipmentsTypeList} edit={EquipmentsTypeEdit} create={EquipmentsTypeCreate} />
    <Resource name='equipments/condition' list={EquipmentsConditionList} edit={EquipmentsConditionEdit} create={EquipmentsConditionCreate} />
    <Resource name='package' list={PackageList} edit={PackageEdit} create={PackageCreate} />
    <Resource name='reservations/reservation' list={ReservationList} edit={ReservationEdit} create={ReservationCreate} />
    <Resource name='reservations/status' list={ReservationStatusList} edit={ReservationStatusEdit} create={ReservationStatusCreate} /> 
    */}
  </Admin>
);

export default App;
