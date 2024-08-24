import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, Form, FormControl, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { FaUserCircle, FaCaretDown, FaCheckCircle } from 'react-icons/fa';

function App() {
  const [showVersion, setShowVersion] = useState(false); // State to control version dropdown
  const [userAccount, setUserAccount] = useState(''); // State to hold the Google account email
  
  // Simulate detection of a logged-in Google account (for demonstration)
  const detectGoogleAccount = () => {
    // Here you would integrate Google Login API to get the user's account info
    // For demonstration purposes, we use a dummy email
    setUserAccount('user@example.com');
  };

  // Toggle version dropdown visibility
  const handleVersionClick = () => {
    setShowVersion(!showVersion);
  };

  // Detect Google account when the component mounts
  React.useEffect(() => {
    detectGoogleAccount();
  }, []);

  return (
    <div className="App" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Full-width Header */}
      <Navbar expand="lg" className="justify-content-between" style={{ backgroundColor: 'inherit' }}>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          MUFASHA
          {/* Version Dropdown Icon */}
          <FaCaretDown onClick={handleVersionClick} style={{ cursor: 'pointer', marginLeft: '10px' }} />
          {/* Verify Icon */}
          <FaCheckCircle color="green" style={{ marginLeft: '5px' }} />
        </Navbar.Brand>
        
        {/* User Account Icon and Dropdown */}
        <DropdownButton 
          align="end" 
          title={<FaUserCircle size={30} />} 
          id="user-account-dropdown" 
          variant="link"
        >
          {userAccount ? (
            <>
              <Dropdown.Item>{userAccount}</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#logout">Logout</Dropdown.Item>
            </>
          ) : (
            <Dropdown.Item href="#login">Login with Google</Dropdown.Item>
          )}
        </DropdownButton>
      </Navbar>

      {/* Version Info Dropdown */}
      {showVersion && (
        <Container className="mt-3 text-center">
          <div className="alert alert-secondary" style={{ display: 'inline-block' }}>
            Mufasha Version 1.0.0 <FaCheckCircle color="green" style={{ marginLeft: '5px' }} />
          </div>
        </Container>
      )}

      {/* Main Content */}
      <Container className="d-flex flex-column align-items-center justify-content-center" style={{ height: '70vh' }}>
        {/* Input Field in the Center */}
        <Form className="w-50">
          <FormControl
            type="text"
            placeholder="Type your query here..."
            className="mb-3"
          />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default App;
