import axios from 'axios';
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'

export const useStore = defineStore('store', {
  state: () => {
    return { 
      baseURL: "http:///localhost:8080/api/v1/",
      token: "",
    }
  },
  actions: {
    // Consulta todas las rutas por metodo POST que solicite y que requieran un token para la autenticación
    RequestPostWithToken: async (url:string, data: object) =>{
      const store = useStore();
      const respuesta = await axios.post(`${store.baseURL}${url}`,{data},{
        headers: {authorization: `bearer ${store.token}`}
      })
      .then( response => {
        return response.data;
      }).catch( error =>{
        store.alerta(error.response.data.mensaje_respuesta, error.response.data.codigo_respuesta)
      })
      return respuesta;
    },
    // Consulta todas las rutas por metodo GET que solicite y que requiera un token para la autenticación
    RequestGetWithToken: async (url:string) => {
      const store = useStore();
      const respuesta = await axios.get(`${store.baseURL}${url}`,{
        headers: {authorization: `bearer ${store.token}`}
      })
      .then( response => {
        return response.data;
      }).catch( error =>{
        store.alerta(error.response.data.mensaje_respuesta, error.response.data.codigo_respuesta)
        return [];
      })
      return respuesta;
    },
    alerta: (title: string, icon: number) =>{
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) =>{
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
  
      Toast.fire({
        icon: (icon == 200) ? "success" : "error",
        title: title
      })
    },
    requiresToken: () => {
      const store = useStore();
      let token = sessionStorage.getItem('token_user');
      if(token != null) store.token = token;
    },
    setToken: (token: string) =>  sessionStorage.setItem("token_user", token),
    setUserInfo: (datos: string) => sessionStorage.setItem("user_info", datos),
    getUserInfo: () => JSON.parse(sessionStorage.getItem("user_info") || "[]")
  },
})