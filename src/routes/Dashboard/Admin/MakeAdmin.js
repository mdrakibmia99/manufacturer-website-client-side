
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../../../shared/Loading';

const MakeAdmin = () => {
    const { data: makeUserAdmin, isLoading, refetch } = useQuery('makeAdmin', () => fetch('http://localhost:5000/users').then(res => res.json()));

    const makeAnUserAdmin = (id) => {
        const url = `http://localhost:5000/user/${id}`;
        const putAdmin = async () => {
            const { data } = await axios.put(url);
            refetch();
            console.log(data);
            toast.success('admin inserted');
        };
        putAdmin();
    };

    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            makeUserAdmin.map((userAdmin, index) => <tr
                                key={userAdmin?._id}
                                className="hover"
                            >
                                <th>{index + 1}</th>
                                <td>{userAdmin?.name}</td>
                                <td>{userAdmin?.email}</td>
                                <td>
                                    {
                                        userAdmin?.role !== "admin"
                                            ?
                                            <button
                                                className='btn btn-outline btn-success btn-md'
                                                onClick={() => makeAnUserAdmin(userAdmin?._id)}
                                            >Make Admin</button>
                                            :
                                            <span className='text-secondary text-xl'>An Admin</span>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MakeAdmin;