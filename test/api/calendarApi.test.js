import calendarApi from "../../src/api/calendarApi";

describe('Pruebas en el calendarApi', () => {
    it('Debe de tener la configuración por defecto', () => {
        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL)
    });
});
