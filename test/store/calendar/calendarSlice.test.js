import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent } from "../../../src/store/calendar/calendarSlice";
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";

describe('Pruebas en calendarSlice', () => {
    it('Debe de regresar el estado por defecto ', () => {
        const state = calendarSlice.getInitialState()
        expect(state).toEqual(initialState)
    });

    it('onSetActiveEvent debe activar el evento', () => {
        const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]))
        expect(state.activeEvent).toEqual(events[0])
    });

    it('onAddNewEvent debe agregar un evento', () => {
        const newEvent = {
            id: '2',
            title: 'Test title 3',
            notes: 'Note test 3',
            start: new Date('2024-09-22:13:00:00'),
            end: new Date('2024-09-22:20:00:00')
        }
        const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent))
        expect(state.events).toContain(newEvent)
        expect(state.events).toEqual([...events, newEvent])
    });

    it('onUpdateEvent debe actualizar un evento', () => {
        const updateEvent = {
            id: '2',
            title: 'Test title 3',
            notes: 'Note test 3',
            start: new Date('2024-09-22:13:00:00'),
            end: new Date('2024-09-22:20:00:00')
        }
        const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(updateEvent))
        expect(state.events).toContain(updateEvent)
    });

    it('onDeleteEvent debe eliminar un evento', () => {
        const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent())
        expect(state.events.length).toBe(1)
        expect(state.activeEvent).toBe(null)
        expect(state.events).not.toContain(events[0])
    });

    it('onLogoutCalendar debe volver al estado inicial', () => {
        const state = calendarSlice.reducer(calendarWithEventsState, onLogoutCalendar())
        expect(state).toEqual(initialState)
    });

    it('onLoadEvents debe establecer todos los eventos', () => {
        const state = calendarSlice.reducer(initialState, onLoadEvents(events))
        expect(state).toEqual(calendarWithEventsState)
        expect(state.isLoadingEvents).toBeFalsy()
    });

})
