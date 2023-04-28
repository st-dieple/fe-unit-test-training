import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Loading from "../shared/components/Loading";

const UserList = () => {

  const [userList, setUserList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = () => {
    axios.get('https://jsonplaceholder.typicode.com/users').then((res: any) => {
      setUserList(res.data);
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setLoading(false);
    });
  };

  return(
    <div className="user-list container">
      <h2>User List</h2>
      {
        isLoading ? 
        <Loading /> :
        (
          <table className="min-w-full text-left text-sm font-light" data-testid="user-list">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-6 py-4">Name</th>
                <th scope="col" className="px-6 py-4">Email</th>
                <th scope="col" className="px-6 py-4">Phone</th>
                <th scope="col" className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {
                userList.length ?
                userList.map((user: any) => (
                  <tr key={ user.id } className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4">{ user.name }</td>
                    <td className="whitespace-nowrap px-6 py-4">{ user.email }</td>
                    <td className="whitespace-nowrap px-6 py-4">{ user.phone }</td>
                    <td className="whitespace-nowrap px-6 p-4">
                      <Link data-testid={`${user.id}`} to={`/user/${user.id}`}>Detail</Link>
                    </td>
                  </tr>
                )) :
                <p data-testid="user-no-data">No data fount</p>
              }
            </tbody>
          </table> 
        )  
      }      
    </div>
  )
};

export default UserList;
