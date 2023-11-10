import React from "react";
// import "../Styles/GithubUsers";

import "./GithubUsers.css";
import { useState } from "react";
import { useEffect } from "react";
const GithubUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const url = "https://api.github.com/users";
  const getUsers = async () => {
    try {
      setIsLoading(true);
      setError(false);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong.");
      }
      const data = await response.json();
      // console.log(data);
      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setError(true);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <div className="container blue-bg">
        <header>
          <h1 style={{ textAlign: "center" }}>Github users</h1>
        </header>
        {isLoading ? (
          <div class="loading-container">
            <div class="loading-text">Loading...</div>
          </div>
        ) : (
          <div className="grid py2">
            {error ? (
              <h4>Something went wrong</h4>
            ) : (
              users.map((user) => {
                const { id, login, avatar_url, html_url } = user;
                return (
                  <div key={id} className="card bg-light p">
                    <img
                      src={avatar_url}
                      alt={login}
                      className="profile-img"
                      mx-2
                    />
                    <span>
                      <h4>{login}</h4>
                      <a href={html_url}>View Profile</a>
                    </span>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GithubUsers;
