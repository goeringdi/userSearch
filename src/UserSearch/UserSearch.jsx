import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import S from './UserSearch.module.css';

const UserSearch = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    if (query) {
      axios.get(`https://api.github.com/search/users?q=${query}&sort=repositories&order=${order}`)
        .then(res => setUsers(res.data.items))
        .catch(err => console.error(err));
    }
  }, [query, order]);

  const handleUserClick = (username) => {
    navigate(`/user/${username}`);
  };

  return (
    <div className={S.userSearch}>
      <h2>Введите имя пользователя</h2>
      <input
        className={S.searchInput}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className={S.button} onClick={() => setOrder(order === "asc" ? "desc" : "asc")}>
        Сортировать ({order === "asc" ? "по возрастанию" : "по убыванию"})
      </button>
      <div className={S.userList}>
        {users.map(user => (
          <div className={S.userItem} key={user.id} onClick={() => handleUserClick(user.login)}>
            {user.login}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSearch;