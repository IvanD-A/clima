import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import MapView from './components/MapView.js'
import axios from 'axios';

function App() {

  const [coordenadas,setCoordenadas] = useState([-17.3895, -66.1568])
  const [predicciones,setPredicciones] = useState({'1628457600000':18,'1577923200000':20})
  const api = axios.create({
    baseURL:"http://localhost:8000"
  })
  const services = {
    arimaTemperatura:async()=>{
      let resultado = null
      await api.post("/predictions/arima", {
        lat: coordenadas[0],
        lon: coordenadas[1]
      }).then((res)=>{
        console.log(res);
        resultado = res
      }).catch(err => {
        console.log(err);
        resultado = err
      })
      return resultado
    }
  }
  const predecir =async()=>{
    await services.arimaTemperatura().then(res => {
      setPredicciones(res.data)
    })
  }

  const formatearFecha = (date)=>{
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const diaSemana = date.getDay()
    return `${diasSemana[diaSemana]}-${year}-${month}-${day}`;
  }

  const diasSemana = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"]

  return (
    <div className='d-flex'>
      <h1>Juapi el Meteorologo</h1>
      <div className="row">
          <div className="coordinates-column">
            <h2>Coordenadas Actuales</h2>
            <input value={coordenadas[0]} disabled></input>
            <input value={coordenadas[1]} disabled></input>
            <button onClick={predecir}>Predecir</button>
          </div>
          <MapView coordenadas={coordenadas} setCoordenadas={setCoordenadas}/>
        <div>
          <div className="temperatures-column">
          <h2>Fecha Y Temperatura</h2>
            {
              Object.keys(predicciones).map((fecha)=>{
                return (
                  <div>
                    <input type="text" value={formatearFecha(new Date(parseInt(fecha)))} />
                    <input className="ms-1" type="text" value={predicciones[fecha]+ "°"} />
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
