import React from 'react';
import {
    List, Datagrid, TextField, EditButton, Edit, TextInput, SimpleForm, Create, useRecordContext,
    required, ReferenceManyToManyInput,
    NumberInput, NumberField, SelectArrayInput, ReferenceInput, SelectInput, ArrayField
} from 'react-admin';

export const ReservationStatusList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);

const ReservationStatusTitle = () => {
    const record = useRecordContext();
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const ReservationStatusEdit = () => {
    return (
        <Edit title={<ReservationStatusTitle />}>
            <SimpleForm>
                <TextInput disabled source="id" />
                <TextInput source="name" />
                <EditButton />
            </SimpleForm>
        </Edit>
    );
}

export const ReservationStatusCreate = () => (
    <Create title="Create a Post">
        <SimpleForm>
            <TextInput source="name" />
            <EditButton />
        </SimpleForm>
    </Create>
);