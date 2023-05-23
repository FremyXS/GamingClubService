import React from 'react';
import { List, Datagrid, TextField, EditButton, Edit, TextInput, SimpleForm, Create, useRecordContext, ReferenceInput, SelectInput, ReferenceArrayInput, FunctionField, AutocompleteInput, required, DateField, DateTimeInput, NumberInput, NumberField } from 'react-admin';

export const PackageList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <DateField format={v => new Date(v)} showTime={true} showDate={false} source="startTime" />
            <DateField showTime={true} showDate={false} source="endTime" />
            <NumberField source="price" />
            <EditButton />
        </Datagrid>
    </List>
);

const PackageTitle = () => {
    const record = useRecordContext();
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const PackageEdit = () => {
    return (
        <Edit title={<PackageTitle />}>
            <SimpleForm>
                <TextInput disabled source="id" />
                <TextInput source="name" />
                <DateTimeInput options={{ format: 'HH:mm' }} source="startTime" />
                <DateTimeInput options={{ format: 'HH:mm' }} source="endTime" />
                <NumberInput source="price" />
                <EditButton />
            </SimpleForm>
        </Edit>
    );
}

export const PackageCreate = () => (
    <Create title="Create a Post">
        <SimpleForm>
            <TextInput source="name" />
            <DateTimeInput options={{ format: 'HH:mm' }} source="startTime" />
            <DateTimeInput format={v => Date(v)} source="endTime" />
            <NumberInput source="price" />
            <EditButton />
        </SimpleForm>
    </Create>
);