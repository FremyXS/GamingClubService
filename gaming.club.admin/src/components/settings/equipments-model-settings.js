import React from 'react';
import { List, Datagrid, TextField, EditButton, Edit, TextInput, SimpleForm, Create, useRecordContext } from 'react-admin';

export const EquipmentsModelList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);

const EquipmentsModelTitle = () => {
    const record = useRecordContext();
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const EquipmentsModelEdit = () => (
    <Edit title={<EquipmentsModelTitle />}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

export const EquipmentsModelCreate = () => (
    <Create title="Create a Model">
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);