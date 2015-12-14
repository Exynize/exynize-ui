import React from 'react';

export const Checkbox = (props) => (
    <div className="checkbox">
        <label>
            <input type="checkbox" checked={props.checked} onChange={props.onChange} />
            <span className="checkbox-material">
                <span className="check"></span>
            </span>
            {props.label}
        </label>
    </div>
);
