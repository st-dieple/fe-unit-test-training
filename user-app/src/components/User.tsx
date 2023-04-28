import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const User = () => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [user, setUser]= useState<any>();

  useEffect(() => {
    getUserDetail();
  }, []);

  const getUserDetail = () => {
    setLoading(true);
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then((res: any) => {
      setUser(res.data);
      console.log(user, res);
    }).finally(() => setLoading(false));
  };

  return (
    <div className="container">
      <h2>User Information</h2>
      {
        !isLoading &&
        <div data-testid="user-info" className="user-info">
          { user ?
            <>
              <h2 data-testid="user-name">Name: {user.name}</h2>
              <p data-testid="user-mail">Email: {user.email}</p>
              <p data-testid="user-phone">Phone: {user.phone}</p>
              <p data-testid="user-company">Company: {user.company.name}</p>
            </> :
            <p data-testid="user-not-found">User not found</p>
          }
        </div>
      }
    </div>
  )
};

export default User;
