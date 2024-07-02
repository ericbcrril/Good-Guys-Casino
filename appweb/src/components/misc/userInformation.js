import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'boxicons';
import { accountCollection } from '../../model/collections';

const Profile = () => {
    const [ account, setAccount] = useState( null );
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
        <div>
          WELCOME
          <button onClick={auth}>press</button>
        </div>
      );
};

export default Profile;