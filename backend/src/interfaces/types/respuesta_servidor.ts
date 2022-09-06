
interface respuestaServidor{
    codigo_respuesta:number,
    tipo_mensaje:string,
    mensaje_respuesta:string,
    detalle_respuesta?:object,
    datos_respuesta?:object,
    token?:string
}

export default respuestaServidor