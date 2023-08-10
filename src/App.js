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
