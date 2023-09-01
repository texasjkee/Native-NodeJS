import React from 'react'
import { Link, Outlet, Route, Routes } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div>
      <h1>About</h1>
      <ul>
        <li><Link to="contact">Contact</Link></li>
        <li><Link to="team">Team</Link></li>
      </ul>
      <Outlet />
      {/* <Routes>
        <Route path='contact' element={<p>Our contact</p>} />
        <Route path='team' element={<p>Our team</p>} />
      </Routes> */}
    </div>
  )
}

export default AboutPage;