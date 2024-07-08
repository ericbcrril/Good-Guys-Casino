import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'boxicons';
import { accountCollection } from '../../model/collections';

const Profile = ({ className }) => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);


        const fetchProfileData = async (e) => {
          e.preventDefault();
            try {
                const response = await axios.get('http://localhost:5000/api/accounts/profile', {withCredentials: true});
                alert('algo no funciona bien', response);
                setProfileData(response.data);
            } catch (error) {
                setError('Error al obtener datos del perfil');
                console.error('Error:', error);
            }
        };

  return (
    <div className={`profile ${className}`}>
      <section className='profile-header'>
      <i class='bx bxs-user-circle'></i>
      <h2>{ profileData } </h2>
      <p>user@gmail.com</p>
      <div>
        <h3>Manage GG account</h3>
        <i class='bx bxs-cog' ></i>
      </div>
      </section>
      <section className='information'>
        <div className='box'>
        <i class='bx bxs-wallet'></i>
        <p>wallet</p>
        </div>
        <div className='box'>
        <i class='bx bx-history' ></i>
        <p>history</p>
        </div>
      </section>
      <section className='log-out'>
      <i class='bx bx-log-in'></i>
      </section>
      <button onClick={fetchProfileData}>click</button>
    </div>
  );
};

export default Profile;