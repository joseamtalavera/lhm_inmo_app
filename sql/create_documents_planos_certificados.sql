-- CREATE TABLE for Documentos (varchivos)
CREATE TABLE IF NOT EXISTS lhainmobiliaria.varchivos (
    id SERIAL PRIMARY KEY,
    ref VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    descripcion TEXT,
    tipo VARCHAR(100),
    fechahora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CREATE TABLE for Planos (vplanos)
CREATE TABLE IF NOT EXISTS lhainmobiliaria.vplanos (
    id SERIAL PRIMARY KEY,
    ref VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    descripcion TEXT,
    tipo VARCHAR(100),
    fechahora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CREATE TABLE for Certificados (vcertificados)
CREATE TABLE IF NOT EXISTS lhainmobiliaria.vcertificados (
    id SERIAL PRIMARY KEY,
    ref VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    descripcion TEXT,
    tipo VARCHAR(100),
    fechahora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CREATE TABLE for Videos (vvideos)
CREATE TABLE IF NOT EXISTS lhainmobiliaria.vvideos (
    id SERIAL PRIMARY KEY,
    ref VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
