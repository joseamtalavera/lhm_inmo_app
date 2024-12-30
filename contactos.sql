CREATE TABLE lhainmobiliaria.contactos (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    property_ref VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
