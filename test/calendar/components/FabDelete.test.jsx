import { render, screen, fireEvent } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { useCalendarStore } from "../../../src/hooks";

jest.mock('../../../src/hooks/useCalendarStore')
describe('Pruebas en <FabDelete/>', () => {

    const mockStartDeleteEvent = jest.fn()

    beforeEach(() => jest.clearAllMocks())
    it('Debe de mostrar componente correctamente', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: false
        })

        render(<FabDelete />)

        const btn = screen.getByLabelText('btn-delete')

        expect(btn.classList).toContain('btn')
        expect(btn.classList).toContain('btn-danger')
        expect(btn.classList).toContain('fab-danger')
        expect(btn.style.display).toBe('none')
    });

    it('Debe mostrar si hay un evento activo', () => {
        useCalendarStore.mockReturnValue({
            hasEventSelected: true
        })

        render(<FabDelete />)

        const btn = screen.getByLabelText('btn-delete')

        expect(btn.style.display).toBe('')
    });

    it('Debe de llamar startDeleteEvent si hay evento activo', () => {
        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
            startDeleteEvent: mockStartDeleteEvent
        })

        render(<FabDelete />)

        const btn = screen.getByLabelText('btn-delete')
        fireEvent.click(btn)
        expect(mockStartDeleteEvent).toHaveBeenCalled()
    });

});
