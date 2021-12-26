import React, {Component} from "react";

export default class NewCalificaciones extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            Alumno:"", 
            Asignatura:"", 
            Nota:"", 
        };

        this.changeCalificacion= this.changeCalificacion.bind(this);
        this.clickAdd = this.clickAdd.bind(this);
    }

    changeCalificacion(event)
    {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    clickAdd()
    {
        this.props.onAddCalificacion(this.state);
        this.setState({
            Alumno:"", 
            Asignatura:"", 
            Nota:""
        });
    }

    render()
    {
        return (
            <table className="table table-bordered table-striped table-hover" >
                <thead>
                    <tr colSpan="3">
                        <th>Nueva Calificación</th>
                    </tr>
                    <tr>
                        <th>Alumno</th>
                        <th>Asignatura</th>
                        <th>Nota</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input className="form-control" type="text" name="Alumno" value={this.state.Alumno} onChange={this.changeCalificacion} />
                        </td>
                        <td>
                            <input className="form-control" type="text" name="Asignatura" value={this.state.Asignatura} onChange={this.changeCalificacion} />
                        </td>
                        <td>
                            <input className="form-control" type="text" name="Nota" value={this.state.Nota} onChange={this.changeCalificacion} />
                        </td>
                        <td>
                            <button className="btn btn-primary" onClick={this.clickAdd} >Añadir Nota</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}