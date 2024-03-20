import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  // KODUNUZ BURAYA GELECEK
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://randomuser.me/api?results=10"
        );
        setUsers(response.data.results);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  const filteredUsers = users.filter((user) =>
    `${user.name.title} ${user.name.first} ${user.name.last}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto my-8">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full md:w-1/2"
      />
      <ul>
        {filteredUsers.map((user, index) => (
          <li key={index} className="mb-4 p-4 border rounded-lg">
            <h2 className="font-bold text-lg">
              {user.name.title} {user.name.first} {user.name.last}
            </h2>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
