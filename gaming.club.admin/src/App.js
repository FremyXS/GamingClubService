import logo from './logo.svg';
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import './App.css';
import { EquipmentCreate, EquipmentEdit, EquipmentList } from './components/settings/equipment-settings';
import { EquipmentsModelCreate, EquipmentsModelEdit, EquipmentsModelList } from './components/settings/equipments-model-settings';
import { EquipmentsTypeCreate, EquipmentsTypeEdit, EquipmentsTypeList } from './components/settings/equipments-type-settings';
import { EquipmentsConditionCreate, EquipmentsConditionEdit, EquipmentsConditionList } from './components/settings/equipments-condition-settings';
import { PackageCreate, PackageEdit, PackageList } from './components/settings/package-settings';

const dataProvider = jsonServerProvider('http://localhost:8000');

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name='equipments/equipment' list={EquipmentList} edit={EquipmentEdit} create={EquipmentCreate}/>
    <Resource name='equipments/model' list={EquipmentsModelList} edit={EquipmentsModelEdit} create={EquipmentsModelCreate}/>
    <Resource name='equipments/type' list={EquipmentsTypeList} edit={EquipmentsTypeEdit} create={EquipmentsTypeCreate}/>
    <Resource name='equipments/condition' list={EquipmentsConditionList} edit={EquipmentsConditionEdit} create={EquipmentsConditionCreate}/>
    <Resource name='package' list={PackageList} edit={PackageEdit} create={PackageCreate}/>
  </Admin>
);

export default App;
