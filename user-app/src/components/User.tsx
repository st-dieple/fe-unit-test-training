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
    <div className="user-info coontainer">
      <h2>User Information</h2>
      {
        !isLoading &&
        <div role="user-detail" className="user-detail">
          { user ?
            <h2 role="user-name">{user.name}</h2> :
            <p>User not found</p>
          }
        </div>
      }
    </div>
  )
};

export default User;
