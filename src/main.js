import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from 'vuex'


//store
const store = createStore({
    state() {
        return {
            lists: [
                {
                    id: 'list1',
                    checked: false,
                    listName: 'list 1',
                    items: [
                        {
                            name: 'item 1',
                            checked: false,
                            color: '#ff0000',
                            count: 5,
                            id: 1
                        },
                        {
                            name: 'item 2',
                            checked: false,
                            color: '#dbe019',
                            count: 15,
                            id: 2
                        },
                        {
                            name: 'item 3',
                            checked: false,
                            color: '#043105',
                            count: 7,
                            id: 3
                        },
                        {
                            name: 'item 4',
                            checked: false,
                            color: '#121a75',
                            count: 10,
                            id: 4
                        }
                    ]
                },
                {
                    id: 'list2',
                    checked: false,
                    listName: 'list 2',
                    items: [
                        {
                            name: 'item1',
                            checked: false,
                            color: '#59336c',
                            count: 5,
                            id: 5
                        },
                        {
                            name: 'item2',
                            checked: false,
                            color: '#95259a',
                            count: 15,
                            id: 6
                        },

                    ]

                },
            ],
        }
    },
    mutations: {
       changeStatus(state, payload) {
           state.lists.forEach(list => {
               if(payload === list.id) {
                   list.checked = !list.checked
                   list.items.forEach(item => {
                           item.checked = list.checked
                   })
               }else {
                   list.items.forEach(item => {
                       if(item.id === payload) {
                           item.checked = !item.checked
                           list.checked = false
                       }
                   })
               }
           })

       },

        changeBoxesCount(state, payload) {
            state.lists.forEach(list => {
                list.items.forEach(item => {
                    if(item.id === payload.id) {
                        item[payload.changedInput] = payload.changedInputVal
                    }
                })
            })
        },


    },
    getters: {
        getLists(state) {
            return state.lists
        },
    }
})

const app = createApp(App);

app.use(store)

app.mount('#app')
