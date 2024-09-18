import { useEffect } from "react"
import Swal from "sweetalert2"
import { useAuthStore, useForm } from "../../hooks"

const loginFormFields = {
  loginEmail: '',
  loginPassword: ''
}
const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPasswordConf: ''
}

export const LoginPage = () => {
  const { startLogin, startRegister, errorMessage } = useAuthStore()
  const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields)
  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPasswordConf,
    onInputChange: onRegisterInputChange
  } = useForm(registerFormFields)

  const loginSubmit = (e) => {
    e.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword })
  }

  const registerSubmit = (e) => {
    e.preventDefault();
    if (registerPassword !== registerPasswordConf) {
      Swal.fire('Error en el registro', 'Las contraseñas no coinciden', 'error')
      return
    }
    startRegister({ name: registerName, email: registerEmail, password: registerPassword })
  }

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autenticación', errorMessage, 'error')
    }
  }, [errorMessage]);

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name='loginEmail'
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                autoComplete="off"
                name='loginPassword'
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Login"
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={registerSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name='registerName'
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name='registerEmail'
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                autoComplete="off"
                name='registerPassword'
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                autoComplete="off"
                name='registerPasswordConf'
                value={registerPasswordConf}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
