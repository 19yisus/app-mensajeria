
-- consulta para reiniciar el indice de un campo serial
-- ALTER SEQUENCE <tabla>_<id>_seq RESTART WITH 1


DELETE tpersona;
DELETE timagen_avatar;
DELETE ttipo_solicitud;
DELETE tusuario;
DELETE tsolicitud;
DELETE tcuarto;
DELETE tmensaje;
DELETE tcontacto;

ALTER SEQUENCE tpersona_id_persona_seq RESTART WITH 1;
ALTER SEQUENCE timagen_avatar_id_imagen_avatar_seq RESTART WITH 1;
ALTER SEQUENCE ttipo_solicitud_id_tipo_solicitud_seq RESTART WITH 1;
ALTER SEQUENCE tusuario_id_usuario_seq RESTART WITH 1;
ALTER SEQUENCE tsolicitud_id_solicitud_seq RESTART WITH 1;
ALTER SEQUENCE tcuarto_id_cuarto_seq RESTART WITH 1;
ALTER SEQUENCE tmensaje_id_mensaje_seq RESTART WITH 1;
ALTER SEQUENCE tcontacto_id_contacto_seq RESTART WITH 1;