import React from 'react';
import {
    List, Datagrid, TextField, EditButton, Edit, TextInput, SimpleForm, Create, useRecordContext,
    required, ReferenceManyToManyInput,
    NumberInput, NumberField, SelectArrayInput, ReferenceInput, SelectInput, ArrayField, SingleFieldList, ChipField, ReferenceArrayInput
} from 'react-admin';

export const ReservationList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="date" />
            <TextField source="startTime" />
            <TextField source="endTime" />
            <NumberField source="price" />
            <ArrayField source="packages">
                <Datagrid bulkActionButtons={false}>
                    <TextField source="id" />
                    <TextField source="name" />
                    <TextField source="description" />
                    <TextField source="price" />
                </Datagrid>
            </ArrayField>
            <ChipField source="status.name" />
            <EditButton />
        </Datagrid>
    </List>
);

const ReservationTitle = () => {
    const record = useRecordContext();
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const ReservationEdit = () => {
    return (
        <Edit title={<ReservationTitle />}>
            <SimpleForm>
                <TextInput disabled source="id" />
                <TextInput source="date" />
                <ReferenceInput source="statusId" reference="reservations/status">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <EditButton />
            </SimpleForm>
        </Edit>
    );
}

export const ReservationCreate = () => (
    <Create title="Create a Post">
        <SimpleForm>
            <TextInput source="date" />
            <ReferenceArrayInput source="packageIds" reference="package">
                <SelectArrayInput optionText="name" />
            </ReferenceArrayInput>
            <EditButton />
        </SimpleForm>
    </Create>
);