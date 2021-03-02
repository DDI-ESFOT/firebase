import { useState } from "react";
import UsersList from "./UsersList";

function App() {
  const [showList, setShowList] = useState(true);

  const handleHideList = () => {
    setShowList(!showList);
  };

  return (
    <>
      <button onClick={handleHideList}>Ocultar lista de usuarios</button>
      {showList && <UsersList />}
    </>
  );
}

export default App;
