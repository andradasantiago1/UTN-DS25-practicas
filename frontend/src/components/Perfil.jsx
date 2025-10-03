import { useUsuario } from '../context/UsuarioContext' ;

function Perfil() {
    const { usuario, setUsuario } = useUsuario ();
    return (
        <div>
            <h2>Perfil de {usuario.nombre}</h2>
            <p>Tema actual: {usuario.tema}</p>
            <button onClick={() => setUsuario ({... usuario, tema: usuario.tema === 'claro' ? 'oscuro' : 'claro'}) }>
                Cambiar tema
            </button>
        </div>
    );
}
export default Perfil;