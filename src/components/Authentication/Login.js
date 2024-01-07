import React from "react";

function Login({setIsLogged}) {

 const handelLogin = (e) => {
e.preventDefault()
setIsLogged(true)
 }

  return (
    <div class="container col-xl-10 col-xxl-8 px-4 py-5">
      <div class="row align-items-center g-lg-5 py-5">
        <div class="col-lg-7 text-center text-lg-start">
          <h1 class="display-4 fw-bold lh-1 mb-3">Welcome to DrDoc</h1>
          <p class="col-lg-10 fs-4">
            Discover a wide range of pre-made Bootstrap components and code
            snippets at BOOTSTRAPFINDS. Streamline your web development with our
            collection of ready-to-use, responsive design elements.
          </p>
        </div>
        <div class="col-md-10 mx-auto col-lg-5">
          <form class="p-4 p-md-5 border rounded-3 bg-light shadow-lg">
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <label for="floatingPassword">Password</label>
            </div>

            <button class="w-100 btn btn-lg btn-primary" type="submit">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
