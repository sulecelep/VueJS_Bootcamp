import { createStore } from "vuex";

const store=createStore({
    state:{
        user:{
            name:"Gökhan",
            lname:"Kandemir",
            age:29,
            address:{},
            password: 123123123,
            tc: 11111,

        },
        theme:"dark",
        permissions:[1,2,3,4,5,6],
        userList:[
            "Gökhan",
            "Tayfun",
            "İlker",
            "Ramazan",
            "Defne",
            "Kamil",
            "Cemil",
        ],
        fullName:"Şule Celep",
        itemList:[
            {id:1,title:"Masa", type:"mobilya"},
            {id:2,title:"Sandalye", type:"mobilya"},
            {id:3,title:"TV", type:"elektronik"},
            {id:4,title:"Monitör", type:"elektronik"},
            {id:5,title:"Bardak", type:"plastik"},
        ],
        
    },
    mutations:{
        newItem(state,item){
            state.itemList.push(item);
        },


    },
    actions:{
        newItem({commit},item){
            console.log('item', item)
            setTimeout(()=>{
                commit("newItem",item);

            },2000);
        }

    },
    getters:{
        _woodItems: state => state.itemList.filter(i=>i.type==="mobilya"),
        _activeUser(state){
            const user = {
                ...state.user
            };
            delete user.password;
            return user;

        }

    }, 
});

export default store;