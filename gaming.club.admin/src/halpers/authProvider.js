import { nameRoles, roles } from '../commons/roles';

const API_URL = 'http://localhost:8000/auth';

const authProvider = {
    login: async ({ username, password }) => {
        const request = new Request(`${API_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({ login: username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });

        await fetch(request)
            .then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('role', data.role);

                localStorage.setItem('username', username);
                return Promise.resolve();
                // accept all username/password combinations
            });
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem('username')
            ? Promise.resolve()
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => {
        // const userRole = localStorage.getItem('role');
        // const permissions = roles[userRole] || [];

        // console.log(permissions);

        // return Promise.resolve({
        //     permissions: [
        //         permissions
        //     ]
        // }
        // );

        const role = localStorage.getItem('role');
        return role ? Promise.resolve(role) : Promise.reject();
    }
};

export default authProvider;