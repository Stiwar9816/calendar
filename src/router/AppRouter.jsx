import { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { LoginPage } from "../auth"
import { CalendarPage } from "../calendar"
import { useAuthStore } from "../hooks"

export const AppRouter = () => {
    const { status, checkAuthToken } = useAuthStore()

    useEffect(() => {
        checkAuthToken()
    }, []);

    if (status === 'checking') {
        return (
            <h3 className="d-flex align-items-center justify-content-center mt-5">Cargando...</h3>
        )
    }

    return (
        <Routes>
            {
                (status === 'not-authenticated')
                    ? (
                        <>
                            <Route path="/auth/*" element={<LoginPage />} />
                            <Route path="/*" element={<Navigate to="/auth/login" />} />
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={<CalendarPage />} />
                            <Route path="/*" element={<Navigate to="/" />} />
                        </>
                    )
            }
        </Routes>
    )
}
