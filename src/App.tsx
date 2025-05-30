// src/App.js
import Airport from './components/Airport';
import Test from './components/Test';

function App() {
  return (
    <div style={{ margin: '50px', textAlign: 'center', display: 'block', minWidth: '1000px', border: '1px solid white' }}>
      <h1>FlightData - METAR & Airport Viewer</h1>
      <Airport />
    </div>
  );
}

export default App;