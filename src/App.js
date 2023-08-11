import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import MapView from './components/MapView.js'
import axios from 'axios';

function App() {

  const [coordenadas,setCoordenadas] = useState([-17.3895, -66.1568])
  const [predicciones,setPredicciones] = useState({})
  const [loading, setLoading] = useState(false)
  const [missingData, setMissingData] = useState(false)
  const api = axios.create({
    baseURL:"http://localhost:8000"
  })
  const services = {
    arimaTemperatura:async() => {
      setMissingData(false)
      setLoading(true);
      let resultado = null
      await api.post("/predictions/arima", {
        lat: coordenadas[0],
        lon: coordenadas[1]
      }).then((res)=>{
        resultado = res.data
        setLoading(false);
      }).catch(err => {
        console.log(err);
        setMissingData(true)
        setLoading(false);
        resultado = {}
      })
      return resultado
    }
  }
  const predecir =async()=>{
    await services.arimaTemperatura().then(res => {
        setPredicciones(res)
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
    <div className=''>
      <h1>Pedrito el Meteorologo</h1>
      <div className="d-flex">
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
              missingData ? 
                <h2>Sin datos de la ubicacion</h2>
              :
              loading ?
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              :
                Object.keys(predicciones).map((fecha)=>{
                  return (
                    <div className='centrado-vertical'>
                      <input readOnly type="text" value={formatearFecha(new Date(parseInt(fecha)))} />
                      <input readOnly className="ms-1" type="text" value={predicciones[fecha]+ "°"} />
                      <img
                        src="https://www.svgrepo.com/show/513351/sun.svg"
                        alt="Ícono de sol"
                        width="15"
                        height="15"
                      />
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
