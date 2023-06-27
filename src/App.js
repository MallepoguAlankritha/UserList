import React, { useState } from 'react';
import './styles.css';

const initialUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    gender: 'Male',
    phone: '1234567890',
    password: 'password123',
    status: 'pending',
    date: '2023-06-27',
    profile_pic: 'avatar.jpg',
  },
  // Add more sample users here
];

const App = () => {
  const [users, setUsers] = useState(initialUsers);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const handleLogin = (email, password) => {
    const user = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
    );

    if (user) {
      setLoggedInUser(user);

      let message;
      if (user.status === 'pending') {
        message = 'Your account is pending activation.';
      } else if (user.status === 'active') {
        message = 'You are logged in as an active user.';
      } else if (user.status === 'de-active') {
        message = 'Your account is currently de-activated.';
      }

      setStatusMessage(message);
    } else {
      setStatusMessage('Invalid email or password');
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setStatusMessage('');
  };

  const handleRegistration = (user) => {
    const newUser = {
      ...user,
      id: users.length + 1,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      profile_pic: 'avatar.jpg',
    };

    setUsers([...users, newUser]);
    setStatusMessage('Registration successful. Please wait for account activation.');
  };
  const handleProfileUpdate = (userId, updatedProfile) => {
    // Check if a new profile picture is provided
    if (updatedProfile.profile_pic) {
      // Create a new FileReader object
      const reader = new FileReader();
  
      reader.onloadend = () => {
        // Update the profile picture in the users array
        setUsers((prevUsers) =>
          prevUsers.map((user) => {
            if (user.id === userId) {
              return { ...user, profile_pic: reader.result };
            }
            return user;
          })
        );
  
        // Display success message
        setStatusMessage('Profile picture updated successfully');
      };
  
      // Read the uploaded profile picture file as data URL
      reader.readAsDataURL(updatedProfile.profile_pic);
    }
  
    // Update other profile fields
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          return { ...user, ...updatedProfile };
        }
        return user;
      })
    );
  
    // Display success message
    setStatusMessage('Profile updated successfully');
  };
  
 

  const handleChangePassword = (userId, newPassword) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === userId ? { ...user, password: newPassword } : user))
    );
    setStatusMessage('Password changed successfully');
  };

  const deleteUserAccount = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setLoggedInUser(null);
    setStatusMessage('Account deleted successfully');
  };

  return (
    <div className="container">
      {loggedInUser ? (
        <div className="welcome-container">
          <h2>Welcome, {loggedInUser.name}</h2>
          <p>Status: {loggedInUser.status}</p>
          <p>{statusMessage}</p>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="login-container">
          <h2>Login</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const email = e.target.email.value;
              const password = e.target.password.value;
              handleLogin(email, password);
            }}
          >
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
          <p>{statusMessage}</p>
        </div>
      )}

      {!loggedInUser && (
        <div className="registration-container">
          <h2>Register</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const name = e.target.name.value;
              const email = e.target.email.value;
              const gender = e.target.gender.value;
              const phone = e.target.phone.value;
              const password = e.target.password.value;
              handleRegistration({ name, email, gender, phone, password });
              e.target.reset();
            }}
          >
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <label>
              Gender:
              <select name="gender" required>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
            <input type="tel" name="phone" placeholder="Phone" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Register</button>
          </form>
          <p>{statusMessage}</p>
        </div>
      )}

      {loggedInUser && (
        <div className="profile-container">
          <h2>Update Profile</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const name = e.target.name.value;
              const email = e.target.email.value;
              const phone = e.target.phone.value;
              const profile_pic = e.target.profile_pic.files[0];
              handleProfileUpdate(loggedInUser.id, { name, email, phone, profile_pic });
            }}
          >
            <input type="text" name="name" placeholder="Name" defaultValue={loggedInUser.name} required />
            <input type="email" name="email" placeholder="Email" defaultValue={loggedInUser.email} required />
            <input type="tel" name="phone" placeholder="Phone" defaultValue={loggedInUser.phone} required />
            <input type="file" name="profile_pic" accept="image/*" />
            <button type="submit">Update Profile</button>
          </form>
        </div>
      )}

      {loggedInUser && (
        <div className="password-container">
          <h2>Change Password</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const newPassword = e.target.newPassword.value;
              handleChangePassword(loggedInUser.id, newPassword);
              e.target.reset();
            }}
          >
            <input type="password" name="newPassword" placeholder="New Password" required />
            <button type="submit">Change Password</button>
          </form>
        </div>
      )}

      {loggedInUser && (
        <div className="delete-container">
          <h2>Delete Account</h2>
          <p>Are you sure you want to delete your account?</p>
          <button onClick={() => deleteUserAccount(loggedInUser.id)}>Delete Account</button>
        </div>
      )}

      <div className="user-list-container">
        <h2>All Registered Users</h2>
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id}>
              <div className="user-info">
                <img className="user-profile-pic" src={user.profile_pic} alt="Profile" />
                <div>
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Status:</strong> {user.status}</p>
                  <p><strong>Date:</strong> {user.date}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
