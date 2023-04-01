import { Routes, Route } from 'react-router-dom';
import './App.css';
import Details from './Details';
import Home from './Home';
import Map from './Map';
import { Signup } from './Signup';
import { Login } from './Login';
import { Profile } from './Profile';
import AddStory from './components/AddStory';

function App() {
	return (
		<Routes>
			<Route path="/addstory" element={<AddStory />} ></Route>
			<Route path="/details/:media/:id" element={<Details />}></Route>
			<Route path="/register" element={<Signup />}></Route>
			<Route path="/login" element={<Login />}></Route>
			<Route path="/map/:storyId" element={<Map />}></Route>
			<Route path="/profile" element={<Profile />}></Route>
			<Route path="/" element={<Home />}></Route>
		</Routes>
	);
}

export default App;
