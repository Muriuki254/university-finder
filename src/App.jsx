import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [searchParam, setSearchParam] = useState('');
  const [universities, setUniversities] = useState([]);
  const API_URL = 'https://universitiesapi.onrender.com/v1/api/universities/';

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUniversities(data);
    } catch (error) {
      console.error('Error fetching universities:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const filteredUniversities = data.filter((university) =>
        university.country.toLowerCase() === searchParam.toLowerCase()
      );
      setUniversities(filteredUniversities);
    } catch (error) {
      console.error('Error searching universities:', error);
    }
  };

  const handleReset = () => {
    setSearchParam('');
    fetchUniversities();
  };

  return (
    <div>
      <div className='Search-bar'>
        <input
          type='text'
          placeholder='Enter country name'
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <h2>Universities Available:</h2>
      {universities.length === 0 ? (
        <p>Loading universities...</p>
      ) : (
        <div className='university-list'>
          {universities.map((university, index) => (
            <div className='card' key={index}>
              <p>Country: {university.country}</p>
              <p>Name: {university.name}</p>
              <p>Website: {university.web_pages.join(', ')}</p>
              <p>ID: {university._id}</p>
              <p>Alpha Code: {university.alpha_two_code}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
