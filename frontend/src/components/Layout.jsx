import { Container } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header'; 
import Footer from './Footer';
import Navbar from './Navbar';
import Searchbar from './Searchbar';

function Layout({ children }) {
	const navigate = useNavigate();
	const location = useLocation();

	const handleSearch = (query) => {
		if (query) {
			navigate(`/search?q=${query}`); 
		}
	};

	const pathsToHideSearch = ['/admin/users', '/admin/books', '/contact', '/', '/login'];
	const shouldHideSearch = pathsToHideSearch.includes(location.pathname);
	const isAdministrativeRoute = location.pathname.startsWith('/admin');
	const shouldShowSearch = !shouldHideSearch && !isAdministrativeRoute;
	
	return (
		<>
			<Header /> 
			<Navbar />

			{shouldShowSearch && (
				<Container className="mt-4">
					<Searchbar onSearch={handleSearch} />
				</Container>
			)}
			
			<Container className="my-4"> 
				{children}
			</Container>

			<Footer />
		</>
	);
}

export default Layout;
