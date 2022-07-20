import app from "./app"

const servidor = app.listen(app.get("PORT"),() => {
    console.log("corriendo api en el puerto : "+app.get("PORT"))
})

export default {
    app,
    servidor
}