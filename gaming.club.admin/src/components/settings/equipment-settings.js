import React from 'react';
import { List, Datagrid, TextField, EditButton, Edit, TextInput, SimpleForm, Create, useRecordContext } from 'react-admin';

export const EquipmentList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="serial_number" />
            <EditButton />
        </Datagrid>
    </List>
);

const EquipmentTitle = () => {
    const record = useRecordContext();
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const EquipmentEdit = () => (
    <Edit title={<EquipmentTitle />}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="serial_number" />
        </SimpleForm>
    </Edit>
);

export const EquipmentCreate = () => (
    <Create title="Create a Post">
        <SimpleForm>
            <TextInput source="serial_number" />
        </SimpleForm>
    </Create>
);