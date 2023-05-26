import React from 'react';
import {
    List, Datagrid, TextField, EditButton, Edit, TextInput, SimpleForm, Create, useRecordContext,
    NumberInput, NumberField, ReferenceInput, SelectInput
} from 'react-admin';

export const PackageList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="description" />
            <TextField source="type_name" />
            <NumberField source="price" />
            <TextField source="startTime" />
            <TextField source="endTime" />
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
                <TextInput source="description" />
                <ReferenceInput source="typeId" reference="equipments/type">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <NumberInput source="price" />
                <TextInput source="startTime" />
                <TextInput source="endTime" />
                <EditButton />
            </SimpleForm>
        </Edit>
    );
}

export const PackageCreate = () => (
    <Create title="Create a Post">
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="description" />
            <ReferenceInput source="typeId" reference="equipments/type">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <NumberInput source="price" />
            <TextInput source="startTime" />
            <TextInput source="endTime" />
            <EditButton />
        </SimpleForm>
    </Create>
);