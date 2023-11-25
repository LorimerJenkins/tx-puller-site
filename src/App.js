import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    blockNumberStart: '',
    blockNumberEnd: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, blockNumberStart, blockNumberEnd } = formData;

    if (!name || !email || !blockNumberStart || !blockNumberEnd) {
      alert('Please fill out all fields.');
      return;
    }


    try {
      const response = await fetch('https://get-data-4a03ad1a15ff.herokuapp.com/get-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Data submitted successfully. Please check your email later.');
      } else {
        alert('Failed to send data. Please try again.');
      }
    } catch (error) {
      alert('An error occurred while sending data.');
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="blockNumberStart"
          placeholder="Block Number Start"
          value={formData.blockNumberStart}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="blockNumberEnd"
          placeholder="Block Number End"
          value={formData.blockNumberEnd}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
