import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserSearch from '../UserSearch/UserSearch';
import UserDetails from '../UserDetails/userDetails';

const AppRoutes = () => (
  <Routes>
    <Route path="/user/:username" element={<UserDetails />} />
    <Route path="/" element={<UserSearch />} />
  </Routes>
);

export default AppRoutes;