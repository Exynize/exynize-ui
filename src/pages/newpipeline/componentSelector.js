import renderComponent from './component';

const renderComponentSelector = function(components: Array<Object>, handleComponent: Function) {
    return components.map(c => renderComponent.call(this, c, handleComponent));
};

export default renderComponentSelector;
