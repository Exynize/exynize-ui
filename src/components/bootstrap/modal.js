import React from 'react';

export const Modal = (props) => (
    <div className="modal" style={{display: 'block', overflow: 'auto'}}>
        <div className="modal-backdrop" onClick={props.onClose}></div>
        <div className="modal-dialog" style={{zIndex: 10000}}>
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" onClick={props.onClose}>×</button>
                    <h4 className="modal-title">{props.title}</h4>
                </div>
                <div className="modal-body">
                    {props.children}
                </div>
                <div className="modal-footer">
                    {props.footer}
                </div>
            </div>
        </div>
    </div>
);
