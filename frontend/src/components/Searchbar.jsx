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
		<div className="input-group input-group-lg searchbar-professional-style">
			<input
				type="text"
				className="form-control"
				placeholder="Buscar libro por título o autor..."
				aria-label="Buscar libro"
				aria-describedby="button-addon2"
				value={searchValue}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
				style={{ borderRadius: '0.5rem 0 0 0.5rem', borderRight: 'none' }}
			/>
			<button
				className="btn btn-primary"
				type="button"
				id="button-addon2"
				onClick={handleSearchClick}
				style={{ 
					backgroundColor: '#007bff', 
					borderColor: '#007bff',
					fontWeight: '600',
					borderRadius: '0 0.5rem 0.5rem 0'
				}}
			>
				Buscar
			</button>
		</div>
	);
};

export default Searchbar;