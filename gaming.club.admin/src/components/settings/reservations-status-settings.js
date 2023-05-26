import React from 'react';
import {
    List, Datagrid, TextField
} from 'react-admin';

export const ReservationStatusList = () => (
    <List>
        <Datagrid isRowSelectable={false}>
            <TextField source="name" />
        </Datagrid>
    </List>
);