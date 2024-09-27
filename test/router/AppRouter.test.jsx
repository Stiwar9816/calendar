import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react"
import { useAuthStore } from "../../src/hooks"
import { AppRouter } from "../../src/router/AppRouter"

jest.mock('../../src/hooks/useAuthStore')
jest.mock('../../src/calendar', () => ({
    CalendarPage: () => <h1>CalendarPage</h1>
}))

describe('Pruebas en el <AppRouter />', () => {

    const mockcheckAuthToken = jest.fn()
    beforeEach(() => jest.clearAllMocks())

    it('Debe de mostrar la pantalla de carga y llamar el checkAuthToken', () => {
        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockcheckAuthToken
        })

        render(<AppRouter />)
        expect(screen.getByText('Cargando...')).toBeTruthy()
        expect(mockcheckAuthToken).toHaveBeenCalled()
    });

    it('Debe de mostrar el login en caso de no estar autenticado', () => {
        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockcheckAuthToken
        })

        const { container } = render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        )
        expect(screen.getByText('Ingreso')).toBeTruthy()
        expect(screen.getByText('Registro')).toBeTruthy()
        expect(container).toMatchSnapshot()
    });

    it('Debe de mostrar el calendario si estamos autenticados', () => {
        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkAuthToken: mockcheckAuthToken
        })

        render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        )

        expect(screen.getByText('CalendarPage')).toBeTruthy()
    });

});
