import { useUsuario } from '../contexts/UsuarioContext' ;
import Perfil from '../components/Perfil' ; 

function HomePage () {
	const { usuario } = useUsuario ();
	return (
		<div>
			<h2>Bienvenido {usuario.nombre}</h2>
			<Perfil />
		</div>
	);
}

export default HomePage ;
