import React from 'react';
import { ChipField, List, Datagrid, TextField, EditButton, Edit, TextInput, SimpleForm, Create, useRecordContext, ReferenceInput, SelectInput } from 'react-admin';

export const UserList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="login" />
            <TextField source="email" />
            <ChipField source="role.name" />
            <EditButton />
        </Datagrid>
    </List>
);

export const UserEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput disabled source="id" />
                <TextInput source="login" />
                <TextInput source="password" />
                <TextInput source="email" />
                <ReferenceInput source="roleId" reference="users/role">
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    );
}

export const UserCreate = () => (
    <Create title="Create a Post">
        <SimpleForm>
            <TextInput source="login" />
            <TextInput source="password" />
            <TextInput source="email" />
            <ReferenceInput source="roleId" reference="users/role">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);