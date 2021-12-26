import React, {Component} from "react";

export default class Calificacion extends Component 
{
    render()
    {
        return (
            <tr>
                <td>{this.props.calificacion.Alumno}</td> 
                <td>{this.props.calificacion.Asignatura}</td>
                <td>{this.props.calificacion.Nota}</td>
                <td>
                    <button className="btn btn-primary" onClick={() => this.props.onEdit(this.props.calificacion)} >Modificar</button>
                    <button className="btn btn-primary" onClick={() => this.props.onDelete(this.props.calificacion)} >Eliminar</button>
                </td>
            </tr>
        );
    }
}