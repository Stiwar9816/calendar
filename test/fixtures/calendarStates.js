export const events = [
    {
        id: '1',
        title: 'Test title',
        notes: 'Note test',
        start: new Date('2024-09-21:13:00:00'),
        end: new Date('2024-09-21:20:00:00')
    },
    {
        id: '2',
        title: 'Test title 2',
        notes: 'Note test 2',
        start: new Date('2024-09-22:13:00:00'),
        end: new Date('2024-09-22:20:00:00')
    }
]

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
}

export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: null
}

export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: {
        ...events[0]
    }
}