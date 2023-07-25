import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SearchResults from './components/SearchResults';


const App = () => (
  <Routes>
    <Route index element={<Home />} />
    <Route path='/search_results' element={<SearchResults />} />
  </Routes>
);

export default App;