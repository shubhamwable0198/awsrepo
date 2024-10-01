import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import { BrowserRouter } from 'react-router-dom';
import { StartupSprintRoutes } from './AppRoutes';
import './Enquiry/Form.css'

function App() {
  return (
    <BrowserRouter>
        <StartupSprintRoutes/>

    </BrowserRouter>
  );
}

export default App;
