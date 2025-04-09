// src/App.js
import Airport from './components/Airport';

function App() {
  return (
    <div style={{ margin: '50px', textAlign: 'center' }}>
      <h1>FlightData - METAR & Airport Viewer</h1>
      <Airport />
    </div>
  );
}

export default App;