import React from 'react';
import { List, Datagrid, TextField, EditButton, Edit, TextInput, SimpleForm, Create, useRecordContext, ReferenceInput, SelectInput, ReferenceArrayInput, FunctionField, AutocompleteInput, required } from 'react-admin';

export const EquipmentList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="serial_number" />
            <TextField source="type_name" />
            <TextField source="model_name" />
            <TextField source="condition_name" />
            <EditButton />
        </Datagrid>
    </List>
);

const EquipmentTitle = () => {
    const record = useRecordContext();
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const EquipmentEdit = () => {
    return (
        <Edit title={<EquipmentTitle />}>
            <SimpleForm>
                <TextInput disabled source="id" />
                <TextInput source="serial_number" />
                <ReferenceInput source="modelId" reference="equipments/model">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <ReferenceInput source="typeId" reference="equipments/type">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <ReferenceInput source="conditionId" reference="equipments/condition">
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    );
}

export const EquipmentCreate = () => (
    <Create title="Create a Post">
        <SimpleForm>
            <TextInput source="serial_number" />
            <ReferenceInput source="modelId" reference="equipments/model">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="typeId" reference="equipments/type">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="conditionId" reference="equipments/condition">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);