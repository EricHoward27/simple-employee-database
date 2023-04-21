import SignUpModal from './components/signUpModal';
import LoginModal from './components/loginModal';
import NavBar from './components/NavBar';
import { User } from './models/users';
import * as EmployeeApi from "./network/employees_api";
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import EmployeePage from './pages/EmployeePage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';
import styles from "./style/App.module.css";
function App() {
  
  const [loggedInUser, setLoggedInUser] = useState<User|null>(null);

  const [showSignUpModal, setShowSignUpModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await EmployeeApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);
  
  return (
  <BrowserRouter>
    <div>
    <NavBar 
    loggedInUser={loggedInUser}
    onLoginClicked={() =>setShowLoginModal(true)}
    onSignUpClicked={()=>setShowSignUpModal(true)}
    onLogoutSuccessful={()=> setLoggedInUser(null)}
    />

    <Container fluid className={ `p-0 ${styles.pageContainer}`}>
      <Routes>
        <Route 
        path='/'
        element={<EmployeePage loggedInUser={loggedInUser}/>}
        />
        <Route 
        path='/privacy'
        element={<PrivacyPage />}
        />
        <Route 
        path='/*'
        element={<NotFoundPage />}
        />
      </Routes>
    </Container>

    {showSignUpModal && 
      <SignUpModal 
      onDismiss={() => setShowSignUpModal(false)}
      onSignUpSuccessful={(user) => {
        setLoggedInUser(user);
        setShowSignUpModal(false);
      }}
      />
      }

      {showLoginModal && 
      <LoginModal 
      onDismiss={() => setShowLoginModal(false)}
      onLoginSuccessful={(user) => {
        setLoggedInUser(user);
        setShowLoginModal(false);
      }}
      
      />
      }
    </div>
  </BrowserRouter>
  );
}

export default App;