import React from 'react';
import {RxState} from '../../stores/util';
import render from './template';

const ComponentSelector = React.createClass({
    mixins: [RxState],

    getDefaultProps() {
        return {
            pageSize: 5,
            components: [],
            user: {},
            actionButtons() {}
        };
    },

    getInitialState() {
        return {
            ...this.props,
            currentPage: 0,
            search: '',
        };
    },
    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps});
    },

    handleSourceToggle(comp) {
        comp.showSource = !comp.showSource;
        this.forceUpdate();
    },

    prevPage() {
        let {currentPage} = this.state;
        currentPage = currentPage >= 1 ? currentPage - 1 : currentPage;
        this.setState({currentPage});
    },
    nextPage() {
        let {currentPage} = this.state;
        const maxPages = Math.ceil(this.state.components.length / this.state.pageSize);
        currentPage = currentPage < (maxPages - 1) ? currentPage + 1 : currentPage;
        this.setState({currentPage});
    },
    setPage(currentPage) {
        this.setState({currentPage});
    },

    handleSearch(e) {
        this.setState({search: e.target.value});
    },

    render,
});

export default ComponentSelector;
