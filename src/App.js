// import React, { useEffect, useState } from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import NavBar from './Navbar'; 
// import Home from './Home'; 
// import Login from './Login';
// import Logout from './Logout';
// import User from './User' 
// import Public from './Public'; 
// import ViewUser from './ViewUser'; 
// import './App.css'; 

// function App() {
//   const [user, setUser] = useState(null);

//   return (
//     useEffect(()={
//       const token = localStorage.getItem('token');
//     })
//     if (!token) {
//       window.location.href = '/login';
//     }
//     <BrowserRouter>
//       <div className="App">
//         <NavBar user={user} onLogout={() => setUser(null)} />
//         <Routes>
//           <Route path="/Home" element={<Home />} />
//           <Route path="/Login" element={<Login />} />
//           <Route path="user" element={<User />} />  
//           <Route path="/Home" element={<Logout />} />
//           <Route
//             path="user"
//             element={<User />}
//           />
//           <Route path="public" element={<Public />} />
          
//         </Routes>
//       </div>
//     </BrowserRouter>
//      },[])
//   );
// }

// export default App;
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './Navbar';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import User from './User';
import Public from './Public';
import ViewUser from './ViewUser';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      window.location.href = '/login';
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar user={user} onLogout={() => setUser(null)} />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/user" element={<User />} />
          <Route path="/public" element={<Public />} />
          <Route path="/viewuser/:id" element={<ViewUser />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
