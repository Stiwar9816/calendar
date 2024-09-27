import { Provider } from "react-redux";
import { renderHook, act, waitFor } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../src/store";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { authenticatedState, initialState, notAuthenticatedState } from "../fixtures/authStates";
import { testUserCredentials } from "../fixtures/testUser";
import { calendarApi } from "../../src/api";


const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: { ...initialState }
        }
    })
}

describe('Pruebas en el useAuthStore', () => {
    beforeEach(() => localStorage.clear());

    it('Debe regresar los valores por defecto', () => {

        const mockStore = getMockStore({ ...initialState })

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}> {children} </Provider>
        })

        expect(result.current).toEqual({
            ...initialState,
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            startLogout: expect.any(Function)
        })

    });

    it('startLogin debe realizar el login correctamente', async () => {
        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });

        await act(async () => await result.current.startLogin(testUserCredentials));

        const { errorMessage, status, user } = result.current;
        const { name, uid } = testUserCredentials

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name, uid }
        });

        expect(localStorage.getItem('token')).toEqual(expect.any(String));
        expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));
    });

    it('startLogin debe de fallar la autenticación', async () => {
        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });

        const testUser = {
            email: 'testUser2@gmail.com',
            password: '123456',
        }

        await act(async () => await result.current.startLogin(testUser))

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'Credenciales incorrectas, intente nuevamente',
            status: 'not-authenticated',
            user: {}
        });
        expect(localStorage.getItem('token')).toBe(null);
        expect(localStorage.getItem('token-init-date')).toBe(null);
        await waitFor(() => expect(result.current.errorMessage).toBe(undefined))
    });


    it('startRegister debe registar a un nuevo usuario correctamente', async () => {
        const newUser = {
            email: 'test2@gmail.com',
            password: '1234567',
            name: 'Test user 2',
            uid: "1234567890"
        }

        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });

        const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
            data: {
                ok: true,
                uid: newUser.uid,
                name: newUser.name,
                token: "Algun token"
            }
        })

        await act(async () => await result.current.startRegister(newUser))

        const { errorMessage, status, user } = result.current

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: newUser.name, uid: newUser.uid }
        })
        expect(localStorage.getItem('token')).toEqual(expect.any(String))
        expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String))
        spy.mockRestore()
    });

    it('startRegister debe fallar en el registro', async () => {

        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });

        await act(async () => await result.current.startRegister(testUserCredentials))

        const { errorMessage, status, user } = result.current

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: `Ya existe un usuario con el email: ${testUserCredentials.email}`,
            status: 'not-authenticated',
            user: {}
        });
    });

    it('checkAuthToken debe fallar si no hay un token', async () => {
        const mockStore = getMockStore(initialState);

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });

        await act(async () => await result.current.checkAuthToken())
        const { errorMessage, status, user } = result.current
        expect({ errorMessage, status, user }).toEqual(notAuthenticatedState)

    });

    it('checkAuthToken debe autenticar el usuario si hay un token', async () => {
        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });

        const { data } = await calendarApi.post('/auth', testUserCredentials)

        localStorage.setItem('token', data.token)

        await act(async () => await result.current.checkAuthToken(localStorage.getItem('token')))

        const { errorMessage, status, user } = result.current
        
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: testUserCredentials.name, uid: testUserCredentials.uid }
        })
    });

});
