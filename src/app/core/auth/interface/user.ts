export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    mobile: number;
    password: string;
    role: number | string;
    route_rights: number[];
    country: number;
    state: number;
    city: number;
}

export interface Route {
    id: number;
    route: string
}
