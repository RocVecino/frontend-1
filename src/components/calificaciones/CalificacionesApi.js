export default class CalificacionesApi
{
    static API_BASE_URL = "/api/v1";

    static requestHeaders()
    {
        return {};
    }

    static getAllNotas()
    {
        const headers = CalificacionesApi.requestHeaders();
        const request = new Request(CalificacionesApi.API_BASE_URL + "/notas", {
            method: "GET",
            headers: headers
        });

        return fetch(request).then(response => {
            return response.json();
        });
    }
}