import React, { useEffect, useState } from 'react';
import axios from 'axios';
import S from './UserDetails.module.css';
import { useParams, useNavigate } from 'react-router-dom';

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://api.github.com/users/${username}`)
      .then(response => {
        setUserDetails(response.data);
      })
      .catch(error => {
        console.error('Ошибка при получении данных о пользователе:', error);
      });
  }, [username]);

  return (
    <div className={S.userDetails}>
      {userDetails ? (
        <>
          <h1 className={S.userName}>{userDetails.name}</h1>
          <p className={S.userInfo}>Подписчики: {userDetails.followers}</p>
          <p className={S.userInfo}>Публичные репозитории: {userDetails.public_repos}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <button className={S.button} onClick={() => navigate(-1)}>На главную</button>
    </div>
  );
};

export default UserDetails;