import React from 'react';
import {RxState} from '../../stores/util';
import componentStore, {getComponents} from '../../stores/component';
import authStore from '../../stores/auth';
import ComponentSelector from '../../components/componentSelector';

const ComponentsCatalogue = React.createClass({
    mixins: [RxState],
    stores: {
        components: componentStore.map(s => s.get('components').toJS()),
        user: authStore.map(s => s.get('user').toJS()),
    },

    getInitialState() {
        getComponents();
        return {
            components: [],
            user: {},
            pageSize: 5,
        };
    },

    render() {
        return (
            <div className="row">
                <div className="col-xs-8 col-xs-offset-2">
                    <div className="page-header page-header-slim">
                        <h4>Components catalogue</h4>
                    </div>
                    <ComponentSelector {...this.state} />
                </div>
            </div>
        );
    },
});

export default ComponentsCatalogue;
