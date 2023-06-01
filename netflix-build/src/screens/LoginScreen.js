import React, { useState } from "react";
import "./LoginScreen.css";
import SignInScreen from "./SignInScreen";
import { useNavigate } from "react-router-dom";

function LoginScreen() {
	const [signIn, setSignIn] = useState(false);
	const navigate = useNavigate();

	return (
		<div className="loginScreen">
			<div className="loginScreen__background">
				<img
					onClick={() => {
						navigate("/");
						setSignIn(false);
					}}
					className="loginScreen__Logo"
					src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
					alt="Netflix Login logo"
				/>
				<button onClick={() => setSignIn(true)} className="loginScreen__button">
					Sign in
				</button>
				<div className="loginScreen__gradient"></div>
			</div>
			<div className="loginScreen__body">
				{signIn ? (
					<SignInScreen />
				) : (
					<>
						<h1>Unlimited films, TV programs and more.</h1>
						<h2>Watch anywhere. Cancel at any time</h2>
						<h3>
							Ready to watch? Enter your email to create or restart your
							membership.
						</h3>
						<div className="loginScreen__input">
							<form>
								<input
									type="email"
									placeholder="Click Get Started to Sign up!"
									name=""
									value=""
								/>
								<button
									onClick={() => setSignIn(true)}
									className="loginScreen__getStarted"
								>
									Get Started
								</button>
							</form>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default LoginScreen;
