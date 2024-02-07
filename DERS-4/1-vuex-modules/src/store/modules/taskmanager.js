/* bunlar birer module store değil o yüzden import createStore yapmadık */

export default {
    namespaced:true,

    state:{
        itemList:[{}],
        userList:[{}],
    },
    mutations:{
        setItem(state,item){
            state.itemList.push(item);
        },
    },
    getters:{
        _itemList: state => state.itemList,
    }
}