import { Routes, Route } from 'react-router-dom';
import './App.css';
import Details from './Details';
import Home from './Home';
import Map from './Map';
import { Signup } from './Signup';
import { Login } from './Login';

function App() {
	return (
		<Routes>
			<Route path="/details/:media/:id" element={<Details />}></Route>
			<Route path="/register" element={<Signup />}></Route>
			<Route path="/login" element={<Login />}></Route>
			<Route path="/map" element={<Map />}></Route>
			<Route path="/" element={<Home />}></Route>
		</Routes>
	);
}

export default App;
