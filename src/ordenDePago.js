import React, {Fragment,useState} from "react";
import  "./ordenDePago.css";

export function OrdenPago () {
    const [datos,setDatos] = useState({
        CodigoOrdenPago : "",
        Monto : 0,
        Tipo : 0,
        Fecha : "",
        Email : "",
    })

    const [reserva, setReserva] = useState({ 
        cvu:{
        estado : "",
        cvu : "",
        cuit:"",
        fecha_activacion:"",
        currency :"",
        id :"",
        label:"",
        client_id:"",
        fecha_desactivacion:""
        }})

    /* const [reserva, setReserva] = useState({ reserva: []}) */

    const handleInputChange = (event)=>{
        //console.log(event.target.value)
        setDatos({
            ...datos, //copia de datos
            [event.target.name] : event.target.value  //asigno valores
        })
    }
    const enviarDatos = (event)=>{
        event.preventDefault();
        console.log(datos.CodigoOrdenPago + " " +  datos.Monto + " " +  datos.Tipo + " " +  datos.Fecha + " "  + datos.Email )

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "codigo_orden_pago": datos.CodigoOrdenPago,
        "monto": parseFloat(datos.Monto),
        "tipo": parseInt(datos.Tipo),
        "fecha_vencimiento": datos.Fecha,
        "email_cliente": datos.Email
        });

        console.log(raw)

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://cpawautojava:1400/altaOrdenPago", requestOptions)
        .then(response => response.json())
        .then(response => {
            setReserva({
                ...reserva,//copia de datos
                cvu : response.cvu.cvu  
            });
            console.log(response)
            console.log(response.cvu)
            console.log(response.cvu.cvu)
        })
        .catch(error => console.log('error', error));
        
            } 

  return (
    <Fragment>
    <div className="container mt-5">
        <h1>Reservas</h1>
        <form className = "form1" onSubmit={enviarDatos}>
        <h4>Ingrese datos de reserva</h4>
            <div className="entradas">
                <input placeholder="Codigo Orden Pago"
                className="form-control" 
                type = "text" 
                name = "CodigoOrdenPago" 
                onChange={handleInputChange}>              
                </input>
            </div>
            <div className="entradas">
                <input placeholder="Monto" 
                className="form-control" 
                type= "double"
                name = "Monto"
                onChange={handleInputChange}>
                </input>
            </div>
            <div className="entradas">
                <input placeholder="Tipo" 
                className="form-control" 
                type= "integer"
                name = "Tipo"
                onChange={handleInputChange}>
                </input>
            </div>
            <div className="entradas">
                <input placeholder="Fecha" 
                className="form-control" 
                type= "text"
                name = "Fecha"
                onChange={handleInputChange}>
                </input>
            </div>
            <div className="entradas">
                <input placeholder="E-mail" 
                className="form-control" 
                type= "text"//"email"
                name = "Email"
                onChange={handleInputChange}>
                </input>
            </div>
            {/* <input type="submit"></input> */}
            <div>
                <button className="boton1" type="submit">Enviar</button>
            </div> 
{/*             <div>
            {reserva.map((reserva,i) => {
                return (
                    <div key = {i}>
                        <h5>{reserva.cvu}</h5>
                    </div>
               );
            })}
            </div> */}
            <p>{reserva.cvu == "[object Object]" ? "" : "Orden de pago aceptada " + ", cvu: " + reserva.cvu}</p>
        </form>
    </div>
    </Fragment>
)  

}