-- CREATE DATABASE app_mensajeria_prod;

-- CREATE DATABASE app_mensajeria_dev

-- CREATE DATABASE app_mensajeria_test;

CREATE TABLE tpersona(
    id_persona SERIAL,
    nick_name character varying(140) NOT NULL,
    nombre character varying(140) NOT NULL,
    apellido character varying(140) NOT NULL,
    constraint PK_id_persona primary(id_persona)
);

CREATE TABLE timagen_avatar(
    id_imagen_avatar SERIAL,
    id_persona INTEGER NOT NULL,
    fecha_de_subida DATE NOT NULL,
    extencion_imagen character varying(3) NOT NULL,
    constraint PK_id_imagen_avatar primary(id_imagen_avatar),
    constraint FK_id_persona_timagen_avatar primary foreign key(id_persona) references tpersona(id_persona) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE ttipo_solicitud(
    id_tipo_solicitud SERIAL,
    tipo character varying(1) NOT NULL,
    constraint PK_id_tipo_solicitud primary(id_tipo_solicitud)
);

CREATE TABLE tusuario(
    id_usuario SERIAL,
    id_persona INTEGER NOT NULL,
    correo character varying(255) NOT NULL,
    telefono character varying(20) NOT NULL,
    clave character varying(255) NOT NULL,
    pregunta_1 character varying(140) NOT NULL,
    pregunta_2 character varying(140) NOT NULL,
    respuesta_1 character varying(140) NOT NULL,
    respuesta_2 character varying(140) NOT NULL,
    constraint PK_id_usuario primary(id_usuario),
    constraint FK_id_persona_tusuario primary foreign key(id_persona) references tpersona(id_persona) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE tsolicitud(
    id_solicitud SERIAL,
    id_tipo_solicitud INTEGER NOT NULL,
    id_usuario_solicito  INTEGER NOT NULL,
    id_solicita INTEGER NOT NULL,
    estado_solicitud character varying(1) NOT NULL,
    fecha_solicitud  DATE NOT NULL,
    constraint PK_id_solicitud primary(id_solicitud),
    constraint FK_id_tipo_solicitud_tsolicitud primary foreign key(id_tipo_solicitud) references ttipo_solicitud(id_tipo_solicitud) ON UPDATE CASCADE ON DELETE CASCADE,
    constraint FK_id_usuario_solicito_tsolicitud primary foreign key(id_usuario_solicito) references tusuario(id_usuario_solicito) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE tcuarto(
    id_cuarto SERIAL,
    nombre_cuarto character varying(140) NOT NULL,
    tipo_cuarto character varying(140) NOT NULL,
    constraint PK_id_cuarto primary(id_cuarto)
);

CREATE TABLE tcontacto(
    id_contacto  SERIAL,
    id_usuario INTEGER NOT NULL,
    id_cuarto  INTEGER NOT NULL,
    contacto_id_usuario INTEGER NOT NULL,
    constraint PK_id_contacto primary(id_contacto),
    constraint FK_id_usuario_tcontacto primary foreign key(id_usuario) references tusuario(id_usuario) ON UPDATE CASCADE ON DELETE CASCADE,
    constraint FK_id_cuarto_tcontacto primary foreign key(id_cuarto) references tcuarto(id_cuarto) ON UPDATE CASCADE ON DELETE CASCADE
);

-- CREATE TABLE tadmin_grupo(
--     id_admin_grupo SERIAL,
--     id_cuarto INTEGER NOT NULL,
--     id_usuario  INTEGER NOT NULL,
--     nivel INTEGER NOT NULL,
--     constraint PK_id_admin_grupo primary(id_admin_grupo),
--     constraint FK_id_cuarto_admin_grupo primary foreign key(id_cuarto) references tcuarto(id_cuarto) ON UPDATE CASCADE ON DELETE CASCADE
--     constraint FK_id_usuario_solicito_admin_grupo primary foreign key(id_usuario_solicito) references tusuario(id_usuario_solicito) ON UPDATE CASCADE ON DELETE CASCADE
-- );