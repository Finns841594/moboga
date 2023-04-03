import { useState } from 'react';

interface SearchToAddStoryProps {
	onSearch: (searchTerm: string) => void;
}

export const SearchToAddStory = ({ onSearch }: SearchToAddStoryProps) => {
	const [search, setSearch] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('👀 search', search);
		onSearch(search);
	};

	return (
		<section className="addstory__search-area ">
			<h2 className="addstory-title">Add a story</h2>
			<div>
				<form onSubmit={handleSearch}>
					<input
						type="text"
						className="search_searchbar"
						onChange={handleChange}
					></input>
					<button type="submit">Search</button>
				</form>
			</div>
		</section>
	);
};
