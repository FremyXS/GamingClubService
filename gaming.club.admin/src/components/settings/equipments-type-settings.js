import React from 'react';
import { List, Datagrid, TextField} from 'react-admin';

export const EquipmentsTypeList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
        </Datagrid>
    </List>
);