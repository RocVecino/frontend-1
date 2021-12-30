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
        CalificacionesApi.deleteNotas(calificacion).then((response)=>{
            this.setState(prevState => ({
                calificaciones : prevState.calificacion.filter((n) => n._id !== calificacion._id)
            }));
        },
        //en caso de que haya error
        (error) => {
            console.log("error delete");
            this.setState(prevState => {
                return ({
                    errorInfo: error.message
                });
            });
        }
        );
    }

    handleCloseError()
    {
        this.setState({
            errorInfo: null
        });
    }

    addCalificacion(calificacion)
    {
        CalificacionesApi.addNotas(calificacion).then(
            (response) => {

                this.setState(prevState => {
                    const calificaciones = prevState.calificaciones;

                    calificacion["_id"] = prevState.calificaciones.length + 1;
        
                    if(!calificaciones.find(p => p.Alumno === calificacion.Alumno && p.Asignatura === calificacion.Asignatura && p.Nota === calificacion.Nota))
                    {         
                        return ({
                            calificaciones: [...prevState.calificaciones, calificacion]
                        });
                    }
                });
                
            },
            (error) => {
                
                this.setState(prevState => {
                    return ({
                        errorInfo: error.message
                    });
                });
            }
        );
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
        CalificacionesApi.updateNotas(calificacion).then((response) => {

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

            },
            (error) => {
                console.log("error update");
                this.setState(prevState => {
                    return ({
                        errorInfo: error.message
                    });
                });
            }
        );
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
    
