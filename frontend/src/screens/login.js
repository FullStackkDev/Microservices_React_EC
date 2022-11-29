import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { CognitoServiceProvider } from "../provider/cognito-service";
import PulseLoader from "react-spinners/PulseLoader";
import ShowPassword from "../images/PasswordIcons/showPassword";
import HidePassword from "../images/PasswordIcons/hidePassword";
import ErrorMessage from "./Components/errorMessage";

export default function Login() {
  const cognitoService = new CognitoServiceProvider();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError]= useState(null)
  // const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

  //Handle password show/hide
  const toggle = () => {
    setOpen(!open);
  };

  let navigate = useNavigate();

  const loginUser = (e) => {
    setIsLoading(true);
    e.preventDefault();
    cognitoService.authenticate(userName, password).then(
      (res) => {
        setIsLoading(false);
        navigate(`/`);
      },
      (err) => {
        setIsLoading(false);
        navigate(`/login`);
        setError(err.message);
      }
    );
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center align-middle pt-96">
          <PulseLoader color="#969a9f" size={20} />
        </div>
      ) : (
        <section className="h-screen">
          <div className="px-6 h-full text-gray-800">
            <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
              <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  className="w-full"
                  alt="Sample view logo"
                />
              </div>
              <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
			  <div className="py-5 w-96">
				{/* if LHS = true, then RHS otherwise nothing */}
				{ error && <ErrorMessage errorMessage={error}/>}
				</div>
                <form onSubmit={loginUser}>
                  <div className="mb-6">
                    <input
                      required
                      type="text"
                      className="form-control block w-96 px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput2"
                      placeholder="Username"
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                    />
                  </div>

                  <div className="mb-6">
                    <input
                      required
                      type={open === false ? "password" : "text"}
                      className="form-control block w-96 px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput2"
                      placeholder="Password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <div className="relative w-fit -right-[355px] bottom-9 hover:cursor-pointer">
                      {open === false ? (
                        <ShowPassword toggle={toggle} />
                      ) : (
                        <HidePassword toggle={toggle} />
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        id="exampleCheck2"
                      />
                      <label className="form-check-label inline-block text-gray-800">
                        Remember me
                      </label>
                    </div>
                  </div>

                  <div className="text-center lg:text-left">
                    <button
                      type="submit"
                      className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Login
                    </button>
                    <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                      Don't have an account?
                      <Link
                        to="/signup"
                        className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                      >
                        {" "}
                        Register
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
