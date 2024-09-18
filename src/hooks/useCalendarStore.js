import { useDispatch, useSelector } from "react-redux"
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from "../store"
import { calendarApi } from "../api"
import { convertEventToDateEvents } from "../helpers"
import Swal from "sweetalert2"

export const useCalendarStore = () => {
    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector(state => state.calendar)
    const { user } = useSelector(state => state.auth)

    const setActiveEvent = (calendarEvent) => dispatch(onSetActiveEvent(calendarEvent))

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events')
            const events = convertEventToDateEvents(data.events)
            dispatch(onLoadEvents(events))
        } catch (error) {
            Swal.fire('Error al cargar los eventos', 'Comuniquese con el administrador', 'error')
        }
    }

    const startSavingEvent = async (calendarEvent) => {
        try {
            // Update
            if (calendarEvent.id) {
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
                dispatch(onUpdateEvent({ ...calendarEvent, user }))
                return
            }
            // Create
            const { data } = await calendarApi.post('/events', calendarEvent)
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.newEvent.id, user }))
        } catch (error) {
            Swal.fire('Error al guardar', error.response.data.msg, 'error')
        }

    }

    const startDeleteEvent = async () => {
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`)
            dispatch(onDeleteEvent())
        } catch (error) {
            Swal.fire('Error al eliminar', error.response.data.msg, 'error')
        }
    }

    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        setActiveEvent,
        startSavingEvent,
        startDeleteEvent,
        startLoadingEvents
    }
}