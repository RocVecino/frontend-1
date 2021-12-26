import React, {Component} from "react";

import Calificacion from './Calificacion';
import Alert from './Alert';
import NewCalificaciones from './NewCalificaciones';
import EditCalificaciones from './EditCalificaciones';
import CalificacionesApi from './CalificacionesApi';

export default class Calificaciones extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            errorInfo: null,
            calificaciones: [],
            isEditing: {}
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
        this.addCalificacion = this.addCalificacion.bind(this);

        this.handleEditCancel = this.handleEditCancel.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
        this.handleEditSave = this.handleEditSave.bind(this);
    }

    componentDidMount()
    {
        CalificacionesApi.getAllNotas().then(
            (result) => {
                this.setState({
                    calificaciones: result
                });
            },
            (error) => {
                this.setState({
                    errorInfo: "ERROR! Problema al conectar con el servidor."
                })
            }
        );
    }

    handleEdit(calificacion)
    {
        this.setState(prevState => {

            return ({
                isEditing: {...prevState.isEditing, [calificacion._id]: calificacion} 
            });

        });
    }

    handleDelete(calificacion)
    {
        this.setState(prevState => ({
            calificaciones: prevState.calificaciones.filter((p) => p._id !== calificacion._id)
        }));
    }

    handleCloseError()
    {
        this.setState({
            errorInfo: null
        });
    }

    addCalificacion(calificacion)
    {
        calificacion["_id"] = this.state.calificaciones.length + 1;

        this.setState(prevState => {

            const calificaciones = prevState.calificaciones;

            if(!calificaciones.find(p => p.identificacion === calificacion.identificacion))
            {
                return ({
                    calificaciones: [...prevState.calificaciones, calificacion]
                });
            }

            return ({
                errorInfo: "La calificacion ya existe en el sistema."
            });
        });
    }

    handleEditCancel(calificacion)
    {
        this.setState(prevState => {
            const isEditing = Object.assign({}, prevState.isEditing);
            delete isEditing[calificacion._id];
            return {
                isEditing: isEditing
            }
        })
    }

    handleEditChange(calificacion)
    {
        this.setState(prevState => ({
            isEditing: {...prevState.isEditing, [calificacion._id]: calificacion}
        }));
    }

    handleEditSave(calificacion)
    {
        this.setState(prevState => {

            const isEditing = Object.assign({}, prevState.isEditing);
            delete isEditing[calificacion._id];

            const calificaciones = prevState.calificaciones;
            const pos = calificaciones.findIndex(p  => p._id ===  calificacion._id);

            return {
                calificaciones: [...calificaciones.slice(0, pos), Object.assign({}, calificacion), ...calificaciones.slice(pos + 1)],
                isEditing: isEditing
            };
        });
    }

    render()
    {
    
        return (
            <div>
                <Alert message={this.state.errorInfo} onClose={this.handleCloseError} />

                <NewCalificaciones onAddCalificacion={this.addCalificacion} />

                <br/>

                <table className="table table-bordered table-striped table-hover" >
                    <thead>
                        <tr colSpan="3">
                            <th>Lista Calificaciones</th>
                        </tr>
                        <tr>
                            <th>Alumno</th>
                            <th>Asignatura</th>
                            <th>Nota</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.calificaciones.map((calificacion) => 
                            
                            !this.state.isEditing[calificacion._id] ?
                            <Calificacion calificacion={calificacion} onEdit={this.handleEdit} onDelete={this.handleDelete} key={calificacion._id} />
                            :
                            <EditCalificaciones 
                                calificacion={this.state.isEditing[calificacion._id]} 
                                onCancel={this.handleEditCancel} 
                                onSave={this.handleEditSave} 
                                onChange={this.handleEditChange}
                                key={calificacion._id} />
                        )}
                        
                    </tbody>
                </table>
                
            </div>
        );

    }
}
    
