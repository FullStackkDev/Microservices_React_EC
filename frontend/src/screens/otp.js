import React, { useEffect, useState } from "react";
import { CognitoServiceProvider } from '../provider/cognito-service';
import { AppContext } from '../context';
import { Link } from "react-router-dom";

export default function OTP() {
  const cognitoService = new CognitoServiceProvider();
  
  const [theme, setTheme] = useState(null);
  const [otpDigits, setOtpDigits] = useState("");
  const [userName, setUserName] = useState(null);

  const result = React.useContext(AppContext);


	useEffect(() => {
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			setTheme("dark");
		} else {
			setTheme("light");
		}
	}, []);

	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [theme]);

  useEffect(() => {
    setUserName(result?.user)
  }, []);

  const verifyUser = () => {
    cognitoService.confirmUser(otpDigits, userName).then(
      (res) => {
        alert('Success! Please Login to your account.');
      },
      (err) => {
        alert(err.message);
      }
    );
  };


	const handleThemeSwitch = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12 dark:bg-slate-500">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl border border-black dark:border-none mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email</p>
            </div>
          </div>

          <div>
            <form>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full">
                  {[...Array(6)].map((index) => {
                    return (
                      <div className="w-16 h-16 ">
                        <input
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-300 dark:border-gray-800  text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 input autofocus"
                          type="number"
                          id="otp"
                          maxLength="1"
                          onChange={(event) => setOtpDigits((otpDigits + event.target.value))}
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <Link to="/login">
                      <button 
                      onClick={() => verifyUser()}
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                        Verify Account
                      </button>
                    </Link>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't recieve code?</p>
                    <Link
                      to="/signup"
                      className="flex flex-row items-center text-blue-600"
                    >
                      Resend
                    </Link>
                  </div>
                  <div className="flex items-center justify-center">
                    <div
                      className="hover:cursor-pointer inline-flex dark:shadow-none shadow-md shadow-black dark:bg-slate-500 px-2 py-2 rounded-md"
                      onClick={handleThemeSwitch}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 mr-3 mt-0.5 dark:text-white text-black"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                        />
                      </svg>

                      <span className="text-3xl sm:text-sm dark:text-white text-black">
                        Dark Mode
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
