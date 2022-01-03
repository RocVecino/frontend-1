export default class ProfesoresApi
{
    static API_BASE_URL = "/api/v1";

    static requestHeaders()
    {
        return {
            'Content-Type': 'application/json',
            "apikey": "6382535d-52dc-4cd5-ab8b-425c9da7727e"
        };
    }

    static async getAllProfesores()
    {
        const headers = ProfesoresApi.requestHeaders();
        const request = new Request(ProfesoresApi.API_BASE_URL + "/profesores", {
            method: "GET",
            headers: headers
        });

        const response = await fetch(request);

        console.log(response);
        console.log(response.ok);

        if(response.ok !== true)
        {
            console.log("pasó por la excepcion");
            throw Error(response.statusText);
        }

        return response.json();
    }

    static async addProfesor(profesor)
    {
        console.log("ProfesoresApi.addProfesor", profesor);
        
        const headers = ProfesoresApi.requestHeaders();
        const request = new Request(ProfesoresApi.API_BASE_URL + "/profesores", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(profesor)
        });

        const response = await fetch(request);

        console.log(response);
        console.log(response.ok);

        if(response.ok !== true)
        {
            console.log("pasó por la excepcion");
            throw Error(response.statusText);
        }        

        return response;
    }

    static async updateProfesor(profesor)
    {
        console.log("ProfesoresApi.updateProfesor", profesor);
        
        const headers = ProfesoresApi.requestHeaders();
        const request = new Request(ProfesoresApi.API_BASE_URL + "/profesores/"+profesor._id, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(profesor)
        });

        const response = await fetch(request); 

        console.log(response);
        console.log(response.ok);

        if(response.ok !== true)
        {
            console.log("pasó por la excepcion");
            throw Error(response.statusText);
        }        

        return response;
    }

    static async deleteProfesor(profesor)
    {
        console.log(profesor);
        
        const headers = ProfesoresApi.requestHeaders();
        const request = new Request(ProfesoresApi.API_BASE_URL + "/profesores/"+profesor._id, {
            method: "DELETE",
            headers: headers,
            body: JSON.stringify(profesor)
        });

        const response = await fetch(request);

        console.log(response);
        console.log(response.ok);

        if(response.ok !== true)
        {
            console.log("pasó por la excepcion");
            throw Error(response.statusText);
        }   

        return response;
    }

}