// src/components/Filters.js

import React, { useState } from 'react';
import { 
  FiltersContainer,
  FilterLabel,
  FilterInput,
  FilterButton,
  Title,
  FilterGroup,
  FilterRow
} from '../../styles/FitersStyles';

const Filters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    minSize: '',
    maxSize: '',
    bedrooms: '',
    bathrooms: '',
    location: '',
  });

  const tipoPropiedadOptions = [
    "Casa rustica o de campo",
    "Chalet/casa independiente",
    "Chalet/casa pareada",
    "Chalet/casa adosada",
    "Inmueble",
    "Piso",
    "Atico/Duplex",
    "Obra Nueva",
    "Oficina",
    "Local",
    "Garaje/parking",
    "Trastero",
    "Terrenos/parcela",
    "Edificio"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);

    console.log('Upadated filters:', updatedFilters);

    if (name === 'location' || name === 'propertyType') {
      onFilterChange(updatedFilters); // Trigger live filtering for location and propertyType
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  return (
    <FiltersContainer>
      <Title>INTRODUZCA SU BUSQUEDA</Title>
      <form onSubmit={handleSubmit}>
        <FilterRow>
          <FilterLabel>Localidad:</FilterLabel>
          <FilterInput
            type="text"
            name="location"
            value={filters.location}
            onChange={handleChange}
          />
        </FilterRow>
        <FilterRow>
          <FilterLabel>Tipo Propiedad:</FilterLabel>
          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleChange}
            style={{
              padding: "8px",
              fontSize: "14px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: "100%"
            }}
          >
            <option value="">Seleccionar Tipo Propiedad</option>
            {tipoPropiedadOptions.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </FilterRow>
        <FilterGroup>
          <div>
            <FilterLabel>Min Precio:</FilterLabel>
            <FilterInput
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
            />
          </div>
          <div>
            <FilterLabel>Max Precio:</FilterLabel>
            <FilterInput
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
            />
          </div>
        </FilterGroup>
        <FilterGroup>
          <div>
            <FilterLabel>Min Tamaño:</FilterLabel>
            <FilterInput
              type="number"
              name="minSize"
              value={filters.minSize}
              onChange={handleChange}
            />
          </div>
          <div>
            <FilterLabel>Max Tamaño:</FilterLabel>
            <FilterInput
              type="number"
              name="maxSize"
              value={filters.maxSize}
              onChange={handleChange}
            />
          </div>
        </FilterGroup>
        <FilterRow>
          <div>
            <FilterLabel>Habitaciones:</FilterLabel>
            <FilterInput
              type="number"
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleChange}
            />
          </div>
        </FilterRow>
        <FilterRow>
          <div>
            <FilterLabel>Baños:</FilterLabel>
            <FilterInput
              type="number"
              name="bathrooms"
              value={filters.bathrooms}
              onChange={handleChange}
            />
          </div>
        </FilterRow>
        <FilterRow>
          <div>
            <FilterLabel>Aseos:</FilterLabel>
            <FilterInput
              type="number"
              name="aseos"
              value={filters.aseos || ''}
              onChange={handleChange}
            />
          </div>
        </FilterRow>
        <FilterButton type="submit">Aplicar Filtros</FilterButton>
      </form>
    </FiltersContainer>
  );
};

export default Filters;

