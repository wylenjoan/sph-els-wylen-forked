import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { listUsers } from "../../apiClient/userService";
import User from "../../interfaces/user";

function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    listAllUsers();
  }, [])

  async function listAllUsers() {
    try {
      const allUsers = (await listUsers()).data;
      setUsers(allUsers);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(`${err.request.status} ${err.request.statusText}`)
      }
    }
  }

  return (
    <div className="container pt-5">
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, first_name, last_name, email, is_admin }) => (
            <tr key={id} >
              <td>{first_name}</td>
              <td>{last_name}</td>
              <td>{email}</td>
              <td>{is_admin ? 'Admin' : 'User'}</td>
            </tr>
          ))}

        </tbody>
      </Table>
    </div>
  )
}

export default UserList
