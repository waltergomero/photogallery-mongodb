import react from 'react';
import AdminLayout from '@/components/layout/admin';

const AdminPage = () =>
{
    return (
        <>
            <h1>Admin Page</h1>
        </>
    )
}

AdminPage.getLayout = function(page) {
    return <AdminLayout>{page}</AdminLayout>;
  };

export default AdminPage;