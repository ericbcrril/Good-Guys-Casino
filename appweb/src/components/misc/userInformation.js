import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'boxicons';
import { accountCollection } from '../../model/collections';

const Profile = ({ className }) => {
  const [account, setAccount] = useState(null);
  const auth = async (e) => {
    e.preventDefault();
    try {
      await axios.get('http://localhost:5000/api/accounts/profile');
      alert('a ver');
    } catch (error) {
      alert('error al iniciar sesion');
    }
  }

  return (
    <div className={`profile ${className}`}>
      <section className='profile-header'>
      <i class='bx bxs-user-circle'></i>
      <h2>Eric Becerril</h2>
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
    </div>
  );
};

export default Profile;