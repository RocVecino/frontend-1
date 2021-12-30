export default class CalificacionesApi
{
    static API_BASE_URL = "/api/v1";
    
    static requestHeaders()
    {
        return {};
    }

    /**METODO GET **/
    static async getAllNotas()
    {
        const headers = CalificacionesApi.requestHeaders();
        const request = new Request(CalificacionesApi.API_BASE_URL + "/notas", {
            method: "GET",
            headers: headers
        });
        
        const response = await fetch(request);

        //capturamos el error en caso de que la repuesta no sea Ok
        if(response.ok !== true){
            throw Error(response.statusText);
        }

        return response.json();
    }

    /** METODO POST**/ 
    static async addNotas(Nota)
    {
        const headers = CalificacionesApi.requestHeaders();
        const request = new Request(CalificacionesApi.API_BASE_URL + "/notas", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(Nota)
        });
        
        const response = await fetch(request);

        //capturamos el error en caso de que la repuesta no sea Ok
        if(response.ok !== true){
            throw Error(response.statusText);
        }

        return response;
    }
    /** METODO PATCH**/ 
    static async updateNotas(Nota)
    {
        const headers = CalificacionesApi.requestHeaders();
        const request = new Request(CalificacionesApi.API_BASE_URL + "/notas", {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(Nota)
        });
        
        const response = await fetch(request);

        console.log(response);

        //capturamos el error en caso de que la repuesta no sea Ok
        if(response.ok !== true){
            throw Error(response.statusText);
        }

        return response;
    }
    /** METODO DELETE**/ 
    static async deleteNotas(Nota)
    {
        const headers = CalificacionesApi.requestHeaders();
        const request = new Request(CalificacionesApi.API_BASE_URL + "/notas", {
            method: "DELETE",
            headers: headers,
            body: JSON.stringify(Nota)
        });
        
        const response = await fetch(request);

        console.log(response);

        //capturamos el error en caso de que la repuesta no sea Ok
        if(response.ok !== true){
            throw Error(response.statusText);
        }

        return response;
    }
}