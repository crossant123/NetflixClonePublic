import React from "react";
import "./ProfileScreen.css";
import Nav from "../Nav";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import PlansScreen from "./PlansScreen";

function ProfileScreen() {
	const user = useSelector(selectUser);
	const navigate = useNavigate();
	return (
		<div className="profileScreen">
			<Nav />
			<div className="profileScreen__body">
				<h1>Edit Profile</h1>
				<div className="profilescreen__info">
					<img
						src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png"
						alt="Netflix Avitar Logo"
					/>
					<div className="profileScreen__details">
						<h2>{user.email}</h2>
						<div className="profileScreen__plans">
							<h3>Plans</h3>
							<PlansScreen />
						</div>
						<button
							onClick={() => {
								auth.signOut();
								navigate("/");
							}}
							className="profileScreen_SignOut"
						>
							Sign Out
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileScreen;
