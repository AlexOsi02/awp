import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar, CTA, Footer, Form } from './components';

const HomeLayout = () => {
  return (
    <>
      <CTA />
      <Form />
    </>
  );
};

const App = () => {
  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        width: '100%',
      }}
    >
      <Router>
        <Navbar />

        <Routes>
          <Route path="/home" element={<HomeLayout />} />
          <Route path="/" element={<HomeLayout />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
