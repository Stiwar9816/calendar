import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState, notAuthenticatedState } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe('Pruebas en authSlice', () => {
    it('Debe regresar el estado inicial', () => {
        expect(authSlice.getInitialState()).toEqual(initialState)
    });

    it('Debe realizar un login', () => {
        const state = authSlice.reducer(initialState, onLogin(testUserCredentials))
        expect(state).toEqual(authenticatedState)
    });

    it('Debe realizar un logout', () => {
        const state = authSlice.reducer(authenticatedState, onLogout())
        expect(state).toEqual(notAuthenticatedState)
    });

    it('Debe limpiar el mensaje de error', () => {
        const errorMessage = 'Credenciales no válidas'
        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage))
        const newState = authSlice.reducer(state, clearErrorMessage())
        expect(newState.errorMessage).toBe(undefined)
    });

});
