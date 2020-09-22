import React from 'react'

const ErrorsAlert = (props) => {
    return (
        <div className="container col-sm-4">
            <div className="alert alert-danger alert-dismissible fade show mt-3" role="alert">
               {props.message}
                <button type="button" className="close" onClick={props.clearError} data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    )
}

export default ErrorsAlert
