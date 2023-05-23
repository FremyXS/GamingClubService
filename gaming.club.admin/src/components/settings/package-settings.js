import React from 'react';
import {
    List, Datagrid, TextField, EditButton, Edit, TextInput, SimpleForm, Create, useRecordContext,
    required, ReferenceManyToManyInput,
    NumberInput, NumberField, SelectArrayInput, ReferenceInput, SelectInput
} from 'react-admin';

export const PackageList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="startTime" />
            <TextField source="endTime" />
            <NumberField source="price" />
            <TextField source="type_name" />
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
                <TextInput source="startTime" />
                <TextInput source="endTime" />
                <NumberInput source="price" />
                <ReferenceInput source="typeId" reference="equipments/type">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <EditButton />
            </SimpleForm>
        </Edit>
    );
}

export const PackageCreate = () => (
    <Create title="Create a Post">
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="startTime" />
            <TextInput source="endTime" />
            <NumberInput source="price" />
            <ReferenceInput source="typeId" reference="equipments/type">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <EditButton />
        </SimpleForm>
    </Create>
);