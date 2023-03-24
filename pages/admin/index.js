// pages/index.js
import React from 'react';
import Gallery from '../admin/gallery'

const AdminPage = () => {
  return (
    <>
    <Gallery/>
    </>
  )
}

export default AdminPage
AdminPage.layout = "Admin";
AdminPage.auth="true;"
