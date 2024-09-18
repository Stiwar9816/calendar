import { useState, useEffect } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import { getMessagesES, localizer } from '../../helpers'
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks'
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../"

export const CalendarPage = () => {
  const { user } = useAuthStore()
  const { openDateModal } = useUiStore()
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = (event) => {
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid)
    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#995972',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
    return { style }
  }

  const onDoubleClick = (event) => {
    openDateModal()
  }
  const onSelect = (event) => {
    setActiveEvent(event)
  }
  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event)
  }

  useEffect(() => {
    startLoadingEvents()
  }, []);

  return (
    <>
      <Navbar />
      <Calendar
        className="my-4 px-4"
        culture="es"
        defaultView={lastView}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  )
}
