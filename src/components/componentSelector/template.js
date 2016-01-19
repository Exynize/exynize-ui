import React from 'react';
import Component from '../../components/component';

const render = function() {
    const {currentPage, pageSize} = this.state;
    const components = this.displayedComponents();
    const pages = new Array(Math.ceil(components.length / pageSize)).fill(0);

    return (
        <div className="row">
            <div className="col-xs-12">
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        value={this.state.search}
                        onChange={this.handleSearch} />
                </div>
                {components
                .slice(pageSize * currentPage, pageSize * currentPage + pageSize)
                .map(c => (
                    <Component
                        {...c}
                        actionButtons={this.state.actionButtons(c)}
                        key={c.id}
                        authUser={this.state.user}
                        toggleSource={this.handleSourceToggle.bind(this, c)} />
                ))}
                <div className="text-center">
                    <ul className="pagination">
                        <li>
                            <a onClick={this.prevPage}><span>&laquo;</span></a>
                        </li>
                        {pages.map((item, index) => (
                            <li key={'page_' + index}
                                onClick={this.setPage.bind(this, index)}
                                className={this.state.currentPage === index ? 'active' : ''}>
                                <a>{index + 1}</a>
                            </li>
                        ))}
                        <li>
                            <a onClick={this.nextPage}><span>&raquo;</span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default render;
