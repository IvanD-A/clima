import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import MapView from './components/MapView.js'
import axios from 'axios';

function App() {

  const [coordenadas,setCoordenadas] = useState([-17.3895, -66.1568])
  const [predicciones,setPredicciones] = useState({'1628457600000':18,'1577923200000':20})
  const api = axios.create({
    baseURL:"localhost:8000"
  })
  const services = {
    arimaTemperatura:async()=>{
      let resultado = null
      await api.get("/predictions/arima", {
        lat:coordenadas[0],
        log:coordenadas[1]
      }).then((res)=>{
        resultado = res
      })
      return resultado
    }
  }
  const predecir =async()=>{
    let prediccion = await services.arimaTemperatura().data
    setPredicciones(prediccion)
  }
  return (
    <div className='d-flex'>
      <div>
        <MapView coordenadas={coordenadas} setCoordenadas={setCoordenadas}/>
        <input value={coordenadas[0]} disabled></input>
        <input value={coordenadas[1]} disabled></input>
        <button onClick={predecir}>Predecir</button>
      </div>
      <div>
        {
          Object.keys(predicciones).map((fecha)=>{
            return (
              <div>
                <input type="text" value={new Date(parseInt(fecha))} />
                <input type="text" value={predicciones[fecha]} />
              </div>
            )
          })
        }
      </div>
    </div>

  );
}

export default App;
