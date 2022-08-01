-- DROP DATABASE app_mensajeria_prod;
-- DROP DATABASE app_mensajeria_dev;
-- DROP DATABASE app_mensajeria_test;

-- CREATE DATABASE app_mensajeria_prod;
-- CREATE DATABASE app_mensajeria_dev;
-- CREATE DATABASE app_mensajeria_test;

CREATE TABLE IF NOT EXISTS tpersona(
    id_persona SERIAL,
    nick_name character varying(140) UNIQUE NOT NULL,
    nombre character varying(140) NOT NULL,
    apellido character varying(140) NOT NULL,
    estado_persona character(1) NOT NULL,
    fecha_creacion DATE NOT NULL,
    constraint PK_id_persona primary key(id_persona)
);

CREATE TABLE IF NOT EXISTS timagen_avatar(
    id_imagen_avatar SERIAL,
    id_persona INTEGER NOT NULL,
    fecha_de_subida DATE NOT NULL,
    extencion_imagen character varying(3) NOT NULL,
    constraint PK_id_imagen_avatar primary key(id_imagen_avatar),
    constraint FK_id_persona_timagen_avatar foreign key(id_persona) references tpersona(id_persona) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ttipo_solicitud(
    id_tipo_solicitud SERIAL,
    tipo character varying(1) NOT NULL,
    constraint PK_id_tipo_solicitud primary key(id_tipo_solicitud)
);

CREATE TABLE IF NOT EXISTS tusuario(
    id_usuario SERIAL,
    id_persona INTEGER NOT NULL,
    correo character varying(255) UNIQUE NOT NULL,
    telefono character varying(20) NULL,
    clave character varying(255) NULL,
    pregunta_1 character varying(140) NOT NULL,
    pregunta_2 character varying(140) NOT NULL,
    respuesta_1 character varying(140) NOT NULL,
    respuesta_2 character varying(140) NOT NULL,
    estado_usuario character(1) NOT NULL,
    constraint PK_id_usuario primary key(id_usuario),
    constraint FK_id_persona_tusuario foreign key(id_persona) references tpersona(id_persona) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tsolicitud(
    id_solicitud SERIAL,
    id_tipo_solicitud INTEGER NOT NULL,
    id_usuario_solicito  INTEGER NOT NULL,
    id_solicita INTEGER NOT NULL,
    estado_solicitud character varying(1) NOT NULL,
    fecha_solicitud  DATE NOT NULL,
    constraint PK_id_solicitud primary key(id_solicitud),
    constraint FK_id_tipo_solicitud_tsolicitud foreign key(id_tipo_solicitud) references ttipo_solicitud(id_tipo_solicitud) ON UPDATE CASCADE ON DELETE CASCADE,
    constraint FK_id_usuario_solicito_tsolicitud foreign key(id_usuario_solicito) references tusuario(id_usuario) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tcuarto(
    id_cuarto SERIAL,
    nombre_cuarto character varying(140) NOT NULL,
    tipo_cuarto character varying(140) NOT NULL,
    estado_cuarto character(1) NOT NULL,
    constraint PK_id_cuarto primary key(id_cuarto)
);

CREATE TABLE IF NOT EXISTS tmensaje(
    id_mensaje SERIAL,
    id_cuarto INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    mensaje character varying(255) NOT NULL,
    fecha_mensaje DATE NOT NULL,
    estado_mensaje character(1) NOT NULL,
    constraint PK_id_mensaje primary key(id_mensaje),
    constraint FK_id_cuarto_tmensaje foreign key(id_cuarto) references tcuarto(id_cuarto) ON UPDATE CASCADE ON DELETE CASCADE,
    constraint FK_id_usuario_tmensaje foreign key(id_usuario) references tusuario(id_usuario) ON UPDATE CASCADE ON DELETE CASCADE

);

CREATE TABLE IF NOT EXISTS tcontacto(
    id_contacto  SERIAL,
    id_usuario INTEGER NOT NULL,
    id_cuarto  INTEGER NOT NULL,
    contacto_id_usuario INTEGER NOT NULL,
    estado_contacto character(1) NOT NULL,
    constraint PK_id_contacto primary key(id_contacto),
    constraint FK_id_usuario_tcontacto foreign key(id_usuario) references tusuario(id_usuario) ON UPDATE CASCADE ON DELETE CASCADE,
    constraint FK_id_cuarto_tcontacto foreign key(id_cuarto) references tcuarto(id_cuarto) ON UPDATE CASCADE ON DELETE CASCADE
);

-- CREATE TABLE IF NOT EXISTS tadmin_grupo(
--     id_admin_grupo SERIAL,
--     id_cuarto INTEGER NOT NULL,
--     id_usuario  INTEGER NOT NULL,
--     nivel INTEGER NOT NULL,
--     constraint PK_id_admin_grupo primary(id_admin_grupo),
--     constraint FK_id_cuarto_admin_grupo primary foreign key(id_cuarto) references tcuarto(id_cuarto) ON UPDATE CASCADE ON DELETE CASCADE
--     constraint FK_id_usuario_solicito_admin_grupo primary foreign key(id_usuario_solicito) references tusuario(id_usuario_solicito) ON UPDATE CASCADE ON DELETE CASCADE
-- );