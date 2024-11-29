// src/components/Filters.js

import React, { useState } from 'react';

const Filters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    minSize: '',
    maxSize: '',
    bedrooms: '',
    bathrooms: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Property Type:</label>
        <input
          type="text"
          name="propertyType"
          value={filters.propertyType}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Min Price:</label>
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Max Price:</label>
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Min Size:</label>
        <input
          type="number"
          name="minSize"
          value={filters.minSize}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Max Size:</label>
        <input
          type="number"
          name="maxSize"
          value={filters.maxSize}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Bedrooms:</label>
        <input
          type="number"
          name="bedrooms"
          value={filters.bedrooms}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Bathrooms:</label>
        <input
          type="number"
          name="bathrooms"
          value={filters.bathrooms}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Apply Filters</button>
    </form>
  );
};

export default Filters;