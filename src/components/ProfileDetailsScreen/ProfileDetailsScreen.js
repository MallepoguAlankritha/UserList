import React, { useEffect, useState } from 'react';
import { Link, Route, useParams, Switch, useHistory } from 'react-router-dom';
import './ProfileDetailsScreen.css';
import PostDetailsScreen from '../PostDetailsScreen/PostDetailsScreen';
import GalleryScreen from '../GalleryScreen/GalleryScreen';
import ToDoScreen from '../ToDoScreen/ToDoScreen';

const ProfileDetailsScreen = () => {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetch('https://panorbit.in/api/users.json')
      .then((response) => response.json())
      .then((data) => {
        const users = data.users;
        const user = users.find((user) => user.id === parseInt(id));
        setUserDetails(user);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleSignout = () => {
    // Perform signout logic here
    history.push('/landing');
  };

  return (
    <div className="container">
      <div className="sidebar">
        <ul>
          <li>
            <Link to={`/profile/${id}`} className="active">
              Profile
            </Link>
          </li>
          <li>
            <Link to={`/profile/${id}/post`}>Post</Link>
          </li>
          <li>
            <Link to={`/profile/${id}/gallery`}>Gallery</Link>
          </li>
          <li>
            <Link to={`/profile/${id}/todo`}>Todo</Link>
          </li>
        </ul>
      </div>
      <div className="content">
        <Switch>
          <Route exact path={`/profile/${id}/post`} component={PostDetailsScreen} />
          <Route exact path={`/profile/${id}/gallery`} component={GalleryScreen} />
          <Route exact path={`/profile/${id}/todo`} component={ToDoScreen} />
          <Route exact path={`/profile/${id}`}>
            <div className="user-details">
              {userDetails && (
                <>
                  <div className="company-details">
                    <img
                      src={userDetails.profilepicture}
                      alt={userDetails.name}
                      className="profile-picture"
                    />
                    <h2 className="username">{userDetails.name}</h2>
                    <p className="website">
                      <strong>Username:</strong> {userDetails.username}
                    </p>
                    <p className="website">
                      <strong>Email:</strong> {userDetails.email}
                    </p>
                    <p className="website">
                      <strong>Phone:</strong> {userDetails.phone}
                    </p>
                    <p className="website">
                      <strong>Website:</strong> {userDetails.website}
                    </p>
                    <h3 className="company-heading">Company</h3>
                    <p className="company-name">
                      <strong>Name:</strong> {userDetails.company.name}
                    </p>
                    <p className="company-catchphrase">
                      <strong>Catchphrase:</strong> {userDetails.company.catchPhrase}
                    </p>
                    <p className="company-bs">
                      <strong>BS:</strong> {userDetails.company.bs}
                    </p>
                    <h3 className="address-heading">Address</h3>
                    <p className="address-street">
                      <strong>Street:</strong> {userDetails.address.street}
                    </p>
                    <p className="address-suite">
                      <strong>Suite:</strong> {userDetails.address.suite}
                    </p>
                    <p className="address-city">
                      <strong>City:</strong> {userDetails.address.city}
                    </p>
                    <p className="address-zipcode">
                      <strong>Zipcode:</strong> {userDetails.address.zipcode}
                    </p>
                    <h3 className="geolocation-heading">Geolocation</h3>
                <p className="geolocation-lat">
                  <strong>Latitude:</strong> {userDetails.address.geo.lat}
                </p>
                <p className="geolocation-lng">
                  <strong>Longitude:</strong> {userDetails.address.geo.lng}
                </p>
                  </div>
                </>
              )}
            </div>
          </Route>
        </Switch>
        <button className="signout-button" onClick={handleSignout}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfileDetailsScreen;
