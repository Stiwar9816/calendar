import { Provider } from "react-redux";
import { renderHook, act } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { useUiStore } from "../../src/hooks/useUiStore";
import { uiSlice } from "../../src/store";


const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }
    })
}
describe('Pruebas en useUiStore', () => {
    it('Debe de regresar los valores por defecto', () => {
        const mockStore = getMockStore({ isDateModalOpen: false })

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children} </Provider>
        })
        expect(result.current).toEqual({
            isDateModalOpen: false,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function),
            toggleDateModal: expect.any(Function)
        })
    });

    it('openDateModal debe de colocar true en el isDateModalOpen', () => {
        const mockStore = getMockStore({ isDateModalOpen: false })
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children} </Provider>
        })

        const { openDateModal } = result.current

        act(() => openDateModal())

        expect(result.current.isDateModalOpen).toBeTruthy()
    });

    it('closeDateModal debe de colocar false en el isDateModalOpen', () => {
        const mockStore = getMockStore({ isDateModalOpen: true })
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children} </Provider>
        })

        const { closeDateModal } = result.current

        act(() => closeDateModal())

        expect(result.current.isDateModalOpen).toBeFalsy()
    });
    it('toggleDateModal debe de colocar false y true en el isDateModalOpen', () => {
        const mockStore = getMockStore({ isDateModalOpen: true })
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children} </Provider>
        })

        act(() => result.current.toggleDateModal())

        expect(result.current.isDateModalOpen).toBeFalsy()

        act(() => result.current.toggleDateModal())

        expect(result.current.isDateModalOpen).toBeTruthy()
    });
});
