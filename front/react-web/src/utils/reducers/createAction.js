export default function createAction(type){
    return [type, `${type}_SUCCESS`, `${type}_FAIL`]
}