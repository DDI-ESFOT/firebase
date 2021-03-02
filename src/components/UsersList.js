import React, { useEffect, useState } from "react";
import { db } from "../firebase";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    db.ref("users").on("value", (snapshot) => {
      const data = snapshot.val();
      console.log("data", data);
      const usersList = [];
      snapshot.forEach((userSnapshot) => {
        console.log("userSnapshot", userSnapshot.val());
        usersList.push(userSnapshot.val());
      });
      setUsers(usersList);
    });

    return () => {
      console.log("SE DESMONTÓ");
      db.ref("users").off();
    };
  }, []);

  const handleSave = async () => {
    await db.ref("users/ID_UNICO").set({
      username: "chalosalvador",
      email: "chalosalvador@gmail.com",
      profile_picture:
        "https://avatars.githubusercontent.com/u/855102?s=460&u=5732ff402503724185f13d4a034ff382e9b262fc&v=4",
    });

    console.log("Datos guardados con éxito (SET)");

    await db.ref("users").push({
      username: "chalosalvador",
      email: "chalosalvador@gmail.com",
      profile_picture:
        "https://avatars.githubusercontent.com/u/855102?s=460&u=5732ff402503724185f13d4a034ff382e9b262fc&v=4",
    });

    console.log("Datos guardados con éxito (PUSH)");
  };
  return (
    <div className="App">
      <button onClick={handleSave}>Guardar datos</button>

      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
