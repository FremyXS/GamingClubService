import React from 'react';
import { List, Datagrid, TextField, EditButton, Edit, TextInput, SimpleForm, Create, useRecordContext } from 'react-admin';

export const EquipmentsConditionList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);

const EquipmentsConditionTitle = () => {
    const record = useRecordContext();
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const EquipmentsConditionEdit = () => (
    <Edit title={<EquipmentsConditionTitle />}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

export const EquipmentsConditionCreate = () => (
    <Create title="Create a Type">
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);