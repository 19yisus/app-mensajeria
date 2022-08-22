 # Lista de tareas pendientes
### Router
* middleware
  * [ ] en la validación de token también se tiene que validar que el usuario tiene que tener la cunta activa
* Login
  * [ ] no generar token a usuarios usuario que tenga las cuenta suspendida
* Contacto
  * [ ] eliminar.
  * [ ] bloquear.
* Mensaje
  * [ ] eliminar.
  * [ ] editar.
  * [ ] agregar notificaciones de manejases
  * [ ] agregar total de numero de mensajes nuevos por contacto y total
* Persona
* Solicitud
  * [ ] si un usuario acepta la solicitud de amistad de otro usuario que todavía lo tenga como contacto si acepta tiene que reutilizar el cuarto generado pero si no es el caso que genere un cuarto nuevo.
* Usuario
  * [ ] recuperación de cuenta.
  * [ ] suspender la cuenta.
  * [ ] eliminar cuenta de forma permanente.

## test
* middleware
  * [ ] validar que a pesar que tenga un token valido no poder hacer uso de la api por que el usuario esta de baja.
* Login
  * [ ] si la persona tiene su cuenta suspendida se le negara el acceso y el uso de las funcionalidades de la api hasta que active la cuenta otra ves.
  * [ ] agregar fecha de vencimiento del token de sesión.
* Contacto
* Mensaje
  * [ ] vitar mensajes vacíos.
  * [ ] evitar inyectar código JS.
  * [ ] evitar solo espacios en blanco.
  * [ ] evitar enviar un mensaje a un cuarto que no te corresponda.
* Persona
  * [ ] evitar enviar datos vacíos en crear y editar.
  * [ ] evitar hacer una consultar y búsqueda por nickname.
* Solicitud
  * [ ] eliminar una solicitud que supuestamente existe.
  * [ ] aceptar una solicitud que supuestamente existe.
  * [ ] enviar una solicitud a una usuario que no existe.
* Usuario
  * [ ] evitar enviar datos vacíos en crear y editar.
  * [ ] evitar hacer una consultar y búsqueda por nickname.
