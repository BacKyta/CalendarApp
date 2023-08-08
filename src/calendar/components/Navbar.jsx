import { PropTypes } from 'prop-types';

export const NavBar = ({ handleChangeLenguage, lenguageText }) => {

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
            <i className="fas fa-calendar-days"></i>
            &nbsp;
             Calendar
        </span>

        <button
         className="btn btn-outline-primary"
         onClick={ handleChangeLenguage } 
         >
            <i className="fas fa-sign-out-alternative"></i>
            <span>Cambiar a { lenguageText }</span>
        </button>

        <button className="btn btn-danger">
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