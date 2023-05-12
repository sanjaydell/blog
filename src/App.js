import React, { useState } from "react";

import { Login } from "./features/Login";
import { Home } from "./features/Home";

function App() {
  const isUserLoggedIn = JSON.parse(window.localStorage.getItem("user"));
  const [user, setUser] = useState(isUserLoggedIn);

  return (
    <React.Fragment>
      {user ? (
        <Home setUser={setUser} />
      ) : (
        <Login setUser={setUser} />
      )}
    </React.Fragment>
  );
}

export default App;
