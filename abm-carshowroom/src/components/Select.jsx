// CustomSelect.js
import React from 'react';
import Select from 'react-select';

// Пример данных для выбора
const options = [
  { value: 'Chrysler', label: 'Chrysler' },
  { value: 'Dodge', label: 'Dodge' },
];

export default function CustomSelect({ onChange }) {
  return (
    <Select
      options={options}
      onChange={onChange}
      placeholder="Choose a car brand..."
      styles={{
        control: (base) => ({
          ...base,
          borderColor: '#ccc',
          boxShadow: 'none',
          maxWidth: '300px', // Устанавливаем максимальную ширину
          '&:hover': { borderColor: '#888' },
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? '#444' : '#fff',
          color: state.isSelected ? '#fff' : '#000',
          '&:hover': { backgroundColor: '#eee' },
        }),
      }}
    />
  );
}
