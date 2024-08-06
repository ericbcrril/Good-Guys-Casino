import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
//import Minigames from './views/ViewMinigames';
import Login from './views/Login';
import Register from './views/Register';
//import HelloWorld from './views/helloWorld';
import NotFound from './views/Home';
import HomeUser from './views/HomeUser';
import ProtectedRoute from './ProtectedRoute';
import SurveyProtected from './surveyProtected';
import Wallet from './views/Wallet';
import { LineGraph } from './components/misc/Graph';
import { GgInformation } from './views/GgInformation';
//import AlertRoute from './AlertRoute';
import { Survey } from './components/misc/survey';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<ProtectedRoute component={HomeUser} redirectTo={'/'}/>} />
        <Route
          path="/minigames"
          element={<SurveyProtected component={HomeUser} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={<ProtectedRoute component={HomeUser} redirectTo={'/login'}/>} />
        <Route path="*" element={<NotFound />} />
        <Route path='/Wallet' element={<Wallet />} />
        <Route path='/graph' element={<LineGraph />} />
        <Route path='/GoodGuys' element={<GgInformation />} />
        <Route path='/survey' element={<Survey />} />
      </Routes>
    </Router>
  );
}

export default App;
