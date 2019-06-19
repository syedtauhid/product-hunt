import React from 'react';
export const session = {
    authorized: false,
    userName: null
};

export const AuthContext = React.createContext(
    session // default value
);