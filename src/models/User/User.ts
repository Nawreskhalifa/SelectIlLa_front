import { PhotoApi, UserApi, UserWithTokenApi, RoleApi } from "./UserApi";

export interface Photo {
    id: number;
    name: string;
    url: string;
}
export interface Role {
    id: number;
    name: string;
}
export interface User {
    id: number;
    username: string;
    email: string;
    gender: string;
    dateOfBirth: string;
    role: Role;
    photo: Photo | null;
    password: string;
    passwordConfirmation: string;
}
export interface UserWithToken {
    jwt: string;
    user: User;
}

// Decode  of Photo
export const decodePhoto = (photoApi: PhotoApi): Photo => {
    return {
        id: photoApi.id,
        name: photoApi.name,
        url: photoApi.url,
    };
};
// Decode  of Role
export const decodeRole = (RoleApi: RoleApi): Role => {
    return {
        id: RoleApi.id,
        name: RoleApi.name,
    };
};
// Decode  of User
export const decodeUser = (userApi: UserApi): User => {
    return {
        id: userApi.id,
        username: userApi.username,
        email: userApi.email,
        gender: userApi.gender,
        dateOfBirth: userApi.date_of_birth,
        role: decodeRole(userApi.role),
        photo: userApi.photo ? decodePhoto(userApi.photo) : null,
        password: userApi.password,
        passwordConfirmation: userApi.password_confirmation,
    };
};
// Decode of UserWithToken
export const decodeUserWithToken = (userWithTokenApi: UserWithTokenApi): UserWithToken => {
    return {
        jwt: userWithTokenApi.jwt,
        user: decodeUser(userWithTokenApi.user),
    };
};

export const decodeUsers = (usersApi: UserApi[]): User[] => {
    return usersApi.map(decodeUser);
};