// src/App.js
import Metar from './components/Metar';
import Airport from './components/Airport';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>METAR & Airport Data Viewer</h1>
      <Metar />
      <Airport />
    </div>
  );
}

export default App;