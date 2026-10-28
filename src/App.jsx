import React, { useState, useEffect } from "react";
import GithubCard from "./Components/GitHubCard.jsx";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          "https://api.github.com/users"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch GitHub users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className="app">
      <h1>Users Profiles</h1>
      <p className="subtitle">Explore Developer Profile on GitHub</p>

      {loading && <h3>Loading users...</h3>}

      {error && <p className="error">{error}</p>}

      <div className="github-container">
        {users.map((user) => ( <GithubCard key={user.id} user={user} /> ))}
      </div>
    </div>
  );
}

export default App;