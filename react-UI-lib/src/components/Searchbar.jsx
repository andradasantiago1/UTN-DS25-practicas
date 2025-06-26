import React, { useState } from 'react';

export const Searchbar = ({ initialSearchValue = '', onSearch }) => {
    const [searchValue, setSearchValue] = useState(initialSearchValue);

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearchClick = () => {
        if (onSearch) {
            onSearch(searchValue.trim());
            }
        };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick();
            }
        };

    return (
    <div className="input-group mb-3">
        <input
            type="text"
            className="form-control"
            placeholder="Buscar libro por título o autor..."
            aria-label="Buscar libro"
            aria-describedby="button-addon2"
            value={searchValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
        />
        <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={handleSearchClick}>Buscar
        </button>
        </div>
    );
};

export default Searchbar;
