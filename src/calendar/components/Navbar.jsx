import { useAuthStore } from "../../hooks"

export const Navbar = () => {
    const { user, startLogout } = useAuthStore()
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
            <div className="container-fluid">
                <span className="navbar-brand">
                    <img src="/src/assets/schedule.png" alt="Logo-calendar" width="30" height="30" className="d-inline-block align-text-top mr-1" />
                    Calendar App - <span>{user.name}</span>
                </span>

                <button className="btn btn-danger" onClick={startLogout}>
                    <i className="fas fa-sign-out-alt mx-1" />
                    Salir
                </button>
            </div>
        </nav>
    )
}
