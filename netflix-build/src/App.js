import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	//This code is used to listen to login state redux handles user state and uses login/logout actions to modify
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((userAuth) => {
			if (userAuth) {
				//logged in
				dispatch(
					login({
						uid: userAuth.uid,
						email: userAuth.email,
						// Could create something in here to add Plan Type to help profileScreen
					})
				);
			} else {
				//logged out
				dispatch(logout());
			}
		});
		return unsubscribe;
	}, [dispatch]);

	return (
		<div className="app">
			<Router>
				{!user ? (
					<LoginScreen />
				) : (
					<Routes>
						<Route exact path="/profile" element={<ProfileScreen />} />
						<Route exact path="/" element={<HomeScreen />} />
					</Routes>
				)}
			</Router>
		</div>
	);
}

export default App;
