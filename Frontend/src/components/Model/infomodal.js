import { useEffect } from "react";

const InfoModel = (props) => {
    useEffect(() => {
        window.$('#myModal2').modal('show');
    });
    return(
        <>
        <div id="myModal2" className="modal fade" role="dialog">
        <div className="modal-dialog modal-md">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" style={{color:"green"}}>{props.title}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>{props.message}</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    </>
    );
}

export default InfoModel;