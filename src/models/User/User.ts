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
    role: Role|null;
    photo: Photo | null;
    password: string;
    passwordConfirmation: string;
}
export interface UserWithToken {
    jwt: string;
    user: User;
}

// Decode  of Photo
export const decodePhoto = (photoApi: PhotoApi): Photo|null => {
    if( photoApi.data)
  {  return {
        id: photoApi.data.id,
        name: photoApi.data.attributes.name,
        url: photoApi.data.attributes.url,
    };}
    return null
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
        id: userApi.data.id,
         username: userApi.data.attributes.email,
        email: userApi.data.attributes.email,
        gender: userApi.data.attributes.gender,
        dateOfBirth: userApi.data.attributes.date_of_birth,
        role:null,
        // role: decodeRole(userApi.data.attributes.role),
        photo: userApi.data.attributes.photo ? decodePhoto(userApi.data.attributes.photo) : null,
        password: userApi.data.attributes.password,
        passwordConfirmation: userApi.data.attributes.password_confirmation,
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