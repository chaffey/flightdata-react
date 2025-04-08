// src/App.js
import Metar from './components/Metar';
import Airport from './components/Airport';

function App() {
  return (
    <div style={{ margin: '50px' }}>
      <h1>FlightData - METAR & Airport Viewer</h1>
      <Airport />
    </div>
  );
}

export default App;