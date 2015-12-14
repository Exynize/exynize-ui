import React from 'react';
import {RxState} from '../../stores/util';
import auth from '../../stores/auth';

const Home = React.createClass({
    mixins: [RxState],
    stores: {
        authed: auth.map(v => v.get('authed')),
    },

    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                {this.state.authed ? (
                    <h3 className="text-success">Welcome! Do some cool stuff!</h3>
                ) : (
                    <h3 className="text-warning">Looks like you are not logged in!</h3>
                )}
                </div>
            </div>
        );
    },
});

export default Home;
