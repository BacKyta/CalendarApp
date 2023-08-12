import { PropTypes } from 'prop-types';
import { useAuthStore } from '../../hooks';

export const NavBar = ({ handleChangeLenguage, lenguageText }) => {

  const { startLogout, user} = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
            <i className="fas fa-calendar-days"></i>
            &nbsp;
             { user.name }
        </span>

        <button
         className="btn btn-outline-primary"
         onClick={ handleChangeLenguage } 
         >
            <i className="fas fa-sign-out-alternative"></i>
            <span>Cambiar a { lenguageText }</span>
        </button>

        <button className="btn btn-danger" onClick={ startLogout }>
            <i className="fa fa-sign-out-alt"></i>
            <span className="m-1">Salir</span>
        </button>

    </div>
  );
};

NavBar.propTypes ={
    handleChangeLenguage: PropTypes.func,
    lenguageText: PropTypes.string
};