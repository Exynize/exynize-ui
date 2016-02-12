import React from 'react';
import {RxState} from '../../stores/util';
import {deleteComponent} from '../../stores/component';
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
        this.setState({...nextProps, currentPage: 0});
    },

    handleSourceToggle(comp) {
        comp.showSource = !comp.showSource;
        this.forceUpdate();
    },
    handleDeleteComponent(comp) {
        const toDel = {user: comp.user.username, component: comp.refName};
        deleteComponent(toDel);
    },

    displayedComponents() {
        const search = this.state.search.toLowerCase();
        return this.state.components
            .filter(c =>
                search.length === 0 ||
                c.description.toLowerCase().includes(search) ||
                c.name.toLowerCase().includes(search) ||
                c.user.username.toLowerCase().includes(search)
            );
    },

    prevPage() {
        let {currentPage} = this.state;
        currentPage = currentPage >= 1 ? currentPage - 1 : currentPage;
        this.setState({currentPage});
    },
    nextPage() {
        let {currentPage} = this.state;
        const maxPages = Math.ceil(this.displayedComponents().length / this.state.pageSize);
        currentPage = currentPage < (maxPages - 1) ? currentPage + 1 : currentPage;
        this.setState({currentPage});
    },
    setPage(currentPage) {
        this.setState({currentPage});
    },

    handleSearch(e) {
        this.setState({currentPage: 0, search: e.target.value});
    },

    render,
});

export default ComponentSelector;
