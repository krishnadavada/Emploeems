import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios library

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchUserProfile();
}, []);

const fetchUserProfile = () => {
  axios.get('http://localhost:3000/auth/profile')
  .then(response => {
          setProfile(response.data);
      })
      .catch(error => {
          console.error('Error fetching user profile:', error);
          setError('Error fetching user profile. Please try again later.');
      });
};

  return (
    <div>
      <br />
    <center><h1>Profile</h1></center>
<br />
<br />
    {error && <p>{error}</p>}
    <center>
    {profile && (
        <div>
            <p>ID: {profile.id}</p>
            <p>Email: {profile.email}</p>
            <p>Password:{profile.password}</p>
        </div>
    )}
    </center>
   
</div>
  );
};

export default Profile;
