import { useState, useEffect } from 'react';
import { Spinner } from '@/components/Spinner';
import { alertService } from '@/services/alert.service';
import { userService } from '@/services/user.service';
import AddEditUserPage from '../addedit';

export default function EditPage({ id }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // fetch user and set default form values if in edit mode
        userService.getById(id)
            .then(x => setUser(x))
            .catch(alertService.error)
    }, []);

    return (
        <>
          {user ? <AddEditUserPage data={user} /> : <Spinner /> }
        </>
                
    );
}

export async function getServerSideProps({ params }) {
  return {
      props: { id: params.id }
  }
}


EditPage.layout = "Admin";