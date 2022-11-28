import React, {Fragment,useState} from "react";
import ReactDOM from "react-dom/client";
import  "./index.css";
import { OrdenPago } from "./ordenDePago.js"; 

const root = ReactDOM.createRoot(document.getElementById("root")); //componente raiz/inicial de react

const Posts = () => {
  const [cvus, setCvus] = useState({ cvus: [] });

  const handleClick = async () => {

      await fetch("http://cpawautojava:1400/consultaCVUs/cuit/20357276706", {
          method: "GET", headers: {
              Accept: 'application/json',
          },
      },)
          .then(data => data.json())
          .then(data => {
              setCvus(data);
              console.log(data);

          }).catch((error) => { console.log(error) })
  }

  return (
      
      <div className="container">
        <br></br>
        <br></br>
          <div className='bg-primary' >
              <h1 className='offset-4'>Reservas</h1>
          </div>

          <div className='mt=10'>
              <button className='btn btn-primary' onClick={() => handleClick()}>
                  Cargar
              </button>
          </div>

          <div className='table-header mt-4'>
              <div className=''>
                  <h4>Datos de la reserva</h4>
              </div>

              <div className='search offset-sm-7'>
                  <form className='form-inline'>
                      <input className='form-control mr-sm-2' type='search' placeholder='buscar'>
                      </input>
                  </form>
              </div>
          </div>

          <div className='table-responsive'>
              <table className="table table-bordered table-striped table-hover table-sm" >
                  <thead className="table-secondary">
                      <tr>
                          <th>#</th>
                          <th>CVU</th>
                          <th>Estado</th>
                          <th>CUIT</th>
                          <th>Label</th>
                          <th>Fecha_Act</th>
                          <th>Fecha_Desact</th>
                      </tr>
                  </thead>

                  <tbody>
                      {cvus.cvus.map((cvu) => {
                          return (

                              <tr key={cvu.id}>
                                  <th> {cvu.id} </th>
                                  <td>{cvu.cvu}</td>
                                  <td>{cvu.estado}</td>
                                  <td>{cvu.cuit}</td>
                                  <td>{cvu.label}</td>
                                  <td>{cvu.fecha_activacion}</td>
                                  <td>{cvu.fecha_desactivacion}</td>
                              </tr>
                          );
                      })}

                  </tbody>

              </table>
              <div className='table-header'>
                  <h4>{cvus.cvus.length}</h4>
              </div>
          </div>

      </div>
  );
}


root.render(

  <><OrdenPago /><Posts /></>

); 
