export const RxState = {
    getInitialState() {
        return {};
    },

    componentWillMount() {
        this.storeSubs = [];
        if (this.stores) {
            Object.keys(this.stores)
            .forEach(key => {
                const stream = this.stores[key];
                this.storeSubs.push(
                    stream.subscribe(res => this.setState({[key]: res}))
                );
            });
        }
    },

    componentWillUnmount() {
        this.storeSubs.forEach(s => s.dispose());
        this.storeSubs = [];
    },
};
