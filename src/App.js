import './App.css';
import Orders from './components/Orders';
import logo from './img/logo.png';

export default function App() {
  return (
    <div>
      <div className='display-center'>
        <div id='logo'>
          <img src={logo} alt='logo'/>
          <h1>Snackpass</h1>
        </div>
        <Orders />
      </div>
    </div>
  );
}
