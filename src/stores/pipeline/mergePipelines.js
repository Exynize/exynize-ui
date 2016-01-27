export default (prev, next, key) => {
    // if it's pipeline status update
    if (key === 'pipelines' && prev.size !== 0 && next.size === 1) {
        // get new pipeline data
        const newPipeline = next.first();
        // find old with index
        const itemIndex = prev.findIndex(value => value.get('id') === newPipeline.get('id'));
        // update old status
        const mergedPipeline = prev.get(itemIndex).set('status', newPipeline.get('status'));
        // swap in old results
        const result = prev.set(itemIndex, mergedPipeline);
        // return
        return result;
    }
    // otherwise - return new value
    return next;
};
