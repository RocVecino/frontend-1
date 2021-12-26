import React, {Component} from "react";

export default class Alert extends Component {
    render()
    {
        if(this.props.message == null)
        {
            return null;
        }
        return (
            <div className="alert alert-warning alert-dismissable" >
                <strong>¡Error!</strong> {this.props.message}
                <button type="button" className="close" onClick={() => this.props.onClose()}>
                    <span>&times;</span>
                </button>
            </div>
        );
    }
}