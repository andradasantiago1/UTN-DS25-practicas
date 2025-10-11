import { Container } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header'; 
import Footer from './Footer';
import Navbar from './Navbar';
// Eliminamos la importación de Searchbar, ya que se renderizará a nivel de página.

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
	
	const shouldHideNavbar = location.pathname === '/login';
	const isLoginPage = location.pathname === '/login';

	//oculta Header y Footer en el login.
	const shouldHideHeaderOrFooter = isLoginPage;

	return (
		<div className={isLoginPage ? "app-layout-login" : "app-layout-sticky"}>
			{/* oculta Header en login */}
			{!shouldHideHeaderOrFooter && <Header />} 

			{/* oculta navbar en login */}
			{!shouldHideNavbar && <Navbar />}

			<div className={isLoginPage ? "login-main-content-fixed" : "main-content-grow"}>				
				<Container className="my-4"> 
					{children}
				</Container>
			</div>
			{/* oculta footer en login */}
			{!shouldHideHeaderOrFooter && <Footer />}
		</div>
	);
}

export default Layout;