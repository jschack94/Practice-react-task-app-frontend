export default (state = [], action) => {
    switch (action.type) {
        case 'ADD_TAG':
            return [...state, action.tag]
        default:
            return state
    }
}