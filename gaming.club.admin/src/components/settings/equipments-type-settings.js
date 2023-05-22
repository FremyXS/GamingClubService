import React from 'react';
import { List, Datagrid, TextField, EditButton, Edit, TextInput, SimpleForm, Create, useRecordContext } from 'react-admin';

export const EquipmentsTypeList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);

const EquipmentsTypeTitle = () => {
    const record = useRecordContext();
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const EquipmentsTypeEdit = () => (
    <Edit title={<EquipmentsTypeTitle />}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

export const EquipmentsTypeCreate = () => (
    <Create title="Create a Type">
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);