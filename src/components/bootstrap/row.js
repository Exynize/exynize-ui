import React from 'react';

export const Row = (props) => (
    <div className="row">
        <div className={'col-xs-' + props.size}>
            {props.children}
        </div>
    </div>
);
