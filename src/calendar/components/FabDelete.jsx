import { useCalendarStore } from "../../hooks"

export const FabDelete = () => {

    const { startDeleteEvent, hasEventSelected } = useCalendarStore()
    const handleDeleteEvent = () => startDeleteEvent()
    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={handleDeleteEvent}
            style={{
                display: hasEventSelected ? '' : 'none'
            }}
        >
            <i className="fas fa-trash-alt" />
        </button>
    )
}
