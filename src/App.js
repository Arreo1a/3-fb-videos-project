import React, { useState, useEffect } from "react";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";

// firebase
import { firebaseApp } from "./fb";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(firebaseApp);

function App() {
  const [globalUser, setGlobalUser] = useState(null);

  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      setGlobalUser(firebaseUser);
    } else {
      setGlobalUser(null);
    }
  });

  return <>{globalUser ? <Home userEmail={globalUser.email} /> : <Login />}</>;
}

export default App;
