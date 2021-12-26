import React, {Component} from "react";

export default class EditCalificaciones extends Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event)
    {
        this.props.onChange({...this.props.calificacion, [event.target.name]: event.target.value}); 
    }

    render()
    {
        return (
            <tr>
                <td>
                    <input className="form-control" type="text" name="Alumno" value={this.props.calificacion.alumno} onChange={this.handleChange} />
                </td>
                <td>
                    <input className="form-control" type="text" name="Asignatura" value={this.props.calificacion.asignatura} onChange={this.handleChange} />
                </td>
                <td>
                    <input className="form-control" type="text" name="Nota" value={this.props.calificacion.nota} onChange={this.handleChange} />
                </td>
                <td>
                    <button className="btn btn-primary" onClick={() => this.props.onSave(this.props.calificacion)} >Guardar</button>
                    <button className="btn btn-primary" onClick={() => this.props.onCancel(this.props.calificacion)} >Cancelar</button>
                </td>
            </tr>
        );
    }
}