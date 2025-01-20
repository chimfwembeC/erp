import React from 'react'

export default function Filter({ options, onFilterChange }) {
    return (
        <select onChange={e => onFilterChange(e.target.value)}>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}
