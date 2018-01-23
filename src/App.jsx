import React from 'react'
import logo from './images/logo.svg'
import Carpark from './containers/carpark'
import Panel from './containers/panel'
import './styles/App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Bus in Carpark Simulator</h1>
      </header>
      <div className="App-content">
        <Carpark />
        <Panel />
      </div>
    </div>
  )
}

export default App
