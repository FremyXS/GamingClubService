export const nameRoles = {
    admin: 'admin',
    manager: 'manager',
    user: 'user'
}

export const roles = {
    admin: [{ action: '*', resource: '*' }],
    manager: [
        {
            action: ['list', 'create', 'edit', 'delete'],
            resource: 'equipments/equipment',
        },
    ]
};