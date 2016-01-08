import React from 'react';
import {History} from 'react-router';
import {Row} from '../../components/bootstrap';
import {RxState} from '../../stores/util';
import componentStore, {getComponents} from '../../stores/component';

const ComponentsCatalogue = React.createClass({
    mixins: [History, RxState],
    stores: {
        components: componentStore.map(s => s.get('components')),
    },

    getInitialState() {
        getComponents();
        return {components: []};
    },

    handleComponentEdit(component) {
        this.history.pushState({component}, '/newcomponent');
    },

    render() {
        return (
            <div className="row">
                <div className="col-xs-8 col-xs-offset-2">
                    <div className="page-header">
                        <h3>Components catalogue</h3>
                    </div>
                    {this.state.components.map(c => c.toJS()).map(c => (
                        <Row size="12" key={'component_' + c.id}>
                            <button
                                className="btn btn-warning btn-xs pull-right"
                                onClick={this.handleComponentEdit.bind(this, c)}>
                                Edit
                            </button>
                            <h5>{c.name} <small className="label label-default">{c.type}</small></h5>
                            <small>{c.description}</small>
                            <pre style={{marginTop: 10}}>{c.source}</pre>
                        </Row>
                    ))}
                </div>
            </div>
        );
    },
});

export default ComponentsCatalogue;
