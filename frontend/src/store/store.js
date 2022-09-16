import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () =>{
    return {
      name: "VUEX"
    }
  },
  getters:{
    framework: state.name
  }  
})