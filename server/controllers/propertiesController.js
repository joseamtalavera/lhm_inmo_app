const exp = require('constants');
const { 
    getAllProperties, 
    addPropertyDb, 
    updatePropertyDb, 
    deletePropertyDb, 
    getPropertyById, 
    getPropertyAmenities,
    getPropertyImages,
    getPropertyDocuments,
    addPropertyAmenities,
    uploadPropertyImageDb,
    updatePropertyAmenitiesDb,
    deleteImageDb,
    uploadPropertyDocumentDb,
    deleteDocumentDb,
    updateAllImagesDb,
    addRequestDb,
    getRequestsDb,
    getPropertyVideos,
    uploadPropertyVideoDb,
    deleteVideoDb,
    getPropertyPlanos,
    uploadPropertyPlanoDb,
    deletePropertyPlanoDb,
} = require('../models/propertiesQueries');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');


// get Controllers

exports.getTableProperties = async (req, res, next) => {
    try { 
        const properties = await getAllProperties();
        res.json(properties);
    } catch (error) {
        console.error('Error in getTableProperties:', error);
        next(error);
    }
};

exports.getPropertyById = async (req, res, next) => {
    const propertyId = req.params.id;
    try {
        const property = await getPropertyById(propertyId);
        res.json(property); 
    } catch (error) {
        console.error('Error in getPropertyById:', error);
        next(error);
    }
}

exports.getPropertyDescriptions = async (req, res, next) => {
    try {
        const ref = req.params.ref;
        const descriptions = await getPropertyDescriptions(ref);
        res.json(descriptions);
    } catch (error) {
        console.error('Error in getPropertyDescriptions:', error);
        next(error);
    }
};

exports.getPropertyAmenities = async (req, res, next) => {
    try {
        const ref = req.params.ref;
        const amenities = await getPropertyAmenities(ref);
        res.json(amenities);    
    } catch (error) {
        console.error('Error in getPropertyAmenities:', error);
        next(error);
    }
}

exports.getPropertyImages = async (req, res, next) => {
    try {
        const ref = req.params.ref;
        const images = await getPropertyImages(ref);
        res.json(images);
    } catch (error) {
        console.error('Error in getPropertyImages:', error);
        next(error);
    }
}

exports.getPropertyDocuments = async (req, res, next) => {
    try {
        const ref = req.params.ref;
        const documents = await getPropertyDocuments(ref);
        res.json(documents);
    } catch (error) {
        console.error('Error in getPropertyDocuments:', error);
        next(error);
    }
}

exports.getRequests = async (req, res, next) => {
    try {
        const result = await getRequestsDb()
        res.status(200).json(result);
    } catch (error) {
        console.error('Error in getRequests:', error);
        res.status(500).json({ message: 'Error fetching requests' });
    }
}

exports.getPropertyVideos = async (req, res, next) => {
    try {
        const ref = req.params.ref;
        const videos = await getPropertyVideos(ref);
        res.json(videos);
    } catch (error) {
        console.error('Error in getPropertyVideos:', error);
        next(error);
    }
}

exports.getPropertyPlanos = async (req, res, next) => {
    try {
        const ref = req.params.ref;
        const planos = await getPropertyPlanos(ref);
        res.json(planos);
    } catch (error) {
        console.error('Error in getPropertyPlanos:', error);
        next(error);
    }
}

exports.getPropertyCertificados = async (req, res, next) => {
    try {
        const ref = req.params.ref;
        const certificados  = await getPropertyCertificados(ref);
        res.json(certificados);
    } catch (error) {
        console.error('Error in getPropertyCertificados:', error);
        next(error);
    }
}


// put Controllers

exports.updateProperty = async (req, res) => {
    try {
        const id = req.params.id; 
        const property = req.body; 
        const updatedProperty = await updatePropertyDb(property, id);
        res.status(200).json(updatedProperty);
    } catch (error) {
        res.status(500).json({ message: 'Error updating property' });
    }
};

exports.updatePropertyAmenities = async (req, res, next) => {
    try {
        const ref = req.params.ref;
        const amenities = req.body.amenities;

        const updatedAmenities = await updatePropertyAmenitiesDb(ref, amenities);
        res.status(200).json(updatedAmenities);
    } catch (error) {
        console.error('Error updating amenities:', error);
        next(error);
    }
};

exports.updateAllImages = async (req, res, next) => {
    try {
        const updatedImages = req.body;
        console.log('Received updated images:', updatedImages);
        const response = await updateAllImagesDb(updatedImages);
        res.status(200).json({ message: 'Images updated successfully', data: response });

    } catch (error) {
        console.error('Error updating images:', error);
        next(error);
    }
}


// post Controllers

exports.addProperty = async (req, res, next) => {
    try {
        // First, add the property
        const newProperty = await addPropertyDb(req.body);
        
        // Then, add amenities (if provided in the request)
        if (req.body.amenities && req.body.amenities.length > 0) {
            await addPropertyAmenities(newProperty.ref, req.body.amenities); // Using the property's ID or ref
        }

        res.json({ message: 'Property and amenities added successfully', property: newProperty });
    } catch (error) {
        console.error('Error in addProperty:', error);
        next(error);
    }
};

exports.addPropertyAmenities = async (req, res, next) => {
    try {
        const ref = req.params.ref;
        const amenities = req.body.amenities;
        const result = await addPropertyAmenities(ref, amenities);
        res.json(result);
    } catch (error) {
        console.error('Error in addPropertyAmenities:', error);
        next(error);
    }
};

exports.uploadPropertyImage = async (req, res, next) => {
    try {
        console.log('Request params:', req.params);
        const ref = req.params.ref;
        const image = req.file; 

        console.log('Received ref:', ref);
        console.log('Received image:', image);
        console.log('Received body:', req.body);

        if (!image) {
            return res.status(400).json({ message: 'No image uploaded' });
        }

        // Determine upload directory basee on environment
        const uploadDir =
            process.env.NODE_ENV === 'production' 
                ? '/usr/share/nginx/uploads' // Production directory
                : path.join(__dirname, '..', 'uploads'); // Development directory
        const currentImages = (await getPropertyImages(ref)) || [];
        const sequenceNumber = currentImages.length + 1;

        // Generate the new file name
        const fileExtension = image.originalname.split('.').pop();
        const fileName = `${ref}-${sequenceNumber}.${fileExtension}`;
        const uploadPath = path.join(uploadDir, fileName);

        // Move the file to the uploads directory
        fs.copyFileSync(image.path, uploadPath); // Copy file to the final name
        fs.unlinkSync(image.path); // Delete the temporary file

        // Generate the URL
        const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
        const domain = process.env.APP_DOMAIN || 'localhost:5010';
        const imageUrl = `${protocol}://${domain}/uploads/${fileName}`;

        // Add metadata for the image
        const principalValue = req.body.principal === 'true' ? 1 : 0;
        const cabeceraValue = req.body.cabecera === 'true' ? 1 : 0;

        const imageDetails = {
            ref, 
            url: imageUrl,
            fototitle: req.body.fototitle || '',
            principal: principalValue,
            cabecera: cabeceraValue,
        };

        console.log('Image details:', imageDetails);

        // Save image details to the database
        const savedImage = await uploadPropertyImageDb(imageDetails);

        console.log('Saved image:', savedImage);

        res.status(201).json(savedImage);
    } catch (error) {
        console.error('Error in uploadPropertyImage:', error);
        next(error);
    }
};


exports.uploadPropertyDocument = async (req, res, next) => {
    try {
        console.log('Request params:', req.params);
        const ref = req.params.ref;
        const document = req.file; 

        console.log('Received ref:', ref);
        console.log('Received document:', document);
        console.log('Received body:', req.body);
       
        if (!document) {
            return res.status(400).json({ message: 'No document uploaded' });
        }

        // Determine upload directory basee on environment
        const uploadDir =
            process.env.NODE_ENV === 'production'
                ? '/usr/share/nginx/documents' // Production directory
                : path.join(__dirname, '..', 'documentos'); // Development directory
        const currentDocuments = await getPropertyDocuments(ref);
        const sequenceNumber = currentDocuments.length + 1;

        // Generate the new file name
        const fileExtension = document.originalname.split('.').pop();
        const fileName = `${ref}-${sequenceNumber}.${fileExtension}`
        const uploadPath = path.join(uploadDir, fileName);

        // Move the file to the uploads directory
        fs.copyFileSync(document.path, uploadPath);
        fs.unlinkSync(document.path); // Delete the temporary file

         // Generate the URL
         const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
         const domain = process.env.APP_DOMAIN || 'localhost:5010';
         const imageUrl = `${protocol}://${domain}/documentos/${fileName}`;

        const documentDetails ={
            ref, 
            url: imageUrl,
            descripcion: req.body.descripcion || '',
            tipo: req.body.tipo || '',
        }

        console.log('Document details:', documentDetails);

        const savedDocument = await uploadPropertyDocumentDb(documentDetails);

        console.log('Saved document:', savedDocument);

        res.status(201).json(savedDocument);
    } catch (error) {
        console.error('Error in uploadPropertyDocument:', error);
        next(error);
    }
};

exports.uploadPropertyVideo = async (req, res, next) => {
    try {
        const ref = req.params.ref;
        const video = req.file;
        if (!video) {
            return res.status(400).json({ message: 'No video uploaded' });
        }
        // Determine upload directory based on environment
        const uploadDir =
            process.env.NODE_ENV === 'production'
                ? '/usr/share/nginx/videos'
                : path.join(__dirname, '..', 'videos');
        const currentVideos = (await getPropertyVideos(ref)) || [];
        const sequenceNumber = currentVideos.length + 1;
        // Generate new file name
        const fileExtension = video.originalname.split('.').pop();
        const fileName = `${ref}-${sequenceNumber}.${fileExtension}`;
        const uploadPath = path.join(uploadDir, fileName);
        // Move the file from temp location to final destination
        fs.copyFileSync(video.path, uploadPath);
        fs.unlinkSync(video.path);
        // Generate the URL for the video
        const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
        const domain = process.env.APP_DOMAIN || 'localhost:5010';
        const videoUrl = `${protocol}://${domain}/videos/${fileName}`;
        const videoDetails = { ref, url: videoUrl };
        const savedVideo = await uploadPropertyVideoDb(videoDetails);
        res.status(201).json(savedVideo);
    } catch (error) {
        console.error('Error in uploadPropertyVideo:', error);
        next(error);
    }
};

exports.uploadPropertyPlano = async (req, res, next) => {
    try {
        const ref = req.params.ref;
        const plano = req.file;
        if (!plano) {
            return res.status(400).json({ message: 'No plano uploaded' });
        }
        const uploadDir =
            process.env.NODE_ENV === 'production'
                ? '/usr/share/nginx/planos'
                : path.join(__dirname, '..', 'planos');
        const currentPlanos = (await getPropertyPlanos(ref)) || [];
        const sequenceNumber = currentPlanos.length + 1;
        const fileExtension = plano.originalname.split('.').pop();
        const fileName = `${ref}-${sequenceNumber}.${fileExtension}`;
        const uploadPath = path.join(uploadDir, fileName);
        fs.copyFileSync(plano.path, uploadPath);
        fs.unlinkSync(plano.path);
        const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
        const domain = process.env.APP_DOMAIN || 'localhost:5010';
        const planoUrl = `${protocol}://${domain}/planos/${fileName}`;
        // Ensure the tipo is set to 'Planos'
        const planoDetails = { 
            ref, 
            url: planoUrl, 
            descripcion: req.body.descripcion || '', 
            tipo: req.body.tipo || 'Planos',
            fechahora: req.body.fechahora || new Date() 
        };
        const savedPlano = await uploadPropertyPlanoDb(planoDetails);
        res.status(201).json(savedPlano);
    } catch (error) {
        console.error('Error in uploadPropertyPlano:', error);
        next(error);
    }
};

exports.uploadPropertyCertificado = async (req, res, next) => {
    try { 
        const ref = req.params.ref;
        const certificado = req.file;
        if (!certificado) {
            return res.status(400).json({ message: 'No certificado uploaded' });
    }
    const uploadDir = 
        process.env.NODE_ENV === 'production'
            ? '/usr/share/nginx/certificados'
            : path.join(__dirname, '..', 'certificados');
    const currentCertificados = (await getPropertyCertificados(ref)) || []; 
    const sequenceNumber = currentCertificados.length + 1;
    const fileExtension = certificado.originalname.split('.').pop();
    const fileName = `${ref}-${sequenceNumber}.${fileExtension}`;
    const uploadPath = path.join(uploadDir, fileName);
    fs.copyFilsSync(certificado.path, uploadPath);
    fs.unlinkSync(certificado.path);
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const domain = process.env.APP_DOMAIN || 'localhost:5010';
    const certificadoUrl = `${protocol}://${domain}/certificados/${fileName}`;
    const certificadoDetails = { 
        ref, 
        url: certificadoUrl,
        descripcion: req.body.descripcion || '',
        tipo: req.body.tipo || 'Certificados',
        fechahora: req.body.fechahora || new Date()
    };
    const savedCertificado = await this.uploadPropertyCertificadoDb(certificadoDetails);
    res.status(201).json(savedCertificado);
    } catch (error) {
        console.error('Error in uploadPropertyCertificado:', error);
        next(error);
    }
};

exports.sendEmail = async (req, res, next) => {
    const { name, message, email, telephone, propertyRef } = req.body;

    // Add debugging logs
    console.log('Received request data:', { message, email, telephone, propertyRef });

    try {
        // save the request to the database
        const newRequest = await addRequestDb({name, message, email, telephone, propertyRef });

        // send the confirmation email to the user
        const transporter = nodemailer.createTransport({
            host: 'smtp.ionos.es',
            port: 587,
            secure: false,
            auth: {
                user: 'info@mo-rentals.com',
                pass: '@Rakna03100310',
            },
        });

        const mailOptions = {
            from: '"Lha Inmobiliaria" info@mo-rentals.com', // Corrected sender address
            to: email,
            subject: 'Solicitud de información',
            text: 'Hemos recibido tu solicitud de información. Nos pondremos en contacto contigo lo antes posible.',
        };

        await transporter.sendMail(mailOptions);

        // send the email to the admin
        const adminMailOptions = {
            from: '"Lha Inmobiliaria" info@mo-rentals.com', // Corrected sender address
            to: 'info@mo-rentals.com',
            subject: 'Nueva solicitud de información',
            text: `New request received for property ${propertyRef}.\n\nMessage: ${message}\nEmail: ${email}\nTelephone: ${telephone}`
    };

    await transporter.sendMail(adminMailOptions);

    res.status(200).json({ message: 'Email sent successfully' });
    }catch (error) {
        console.error('Error in sendEmail:', error);
        res.status(500).json({ message: 'Error sending email' });
    }
};



// delete Controllers   

exports.deleteProperty = async (req, res, next) => {
    try {
        const deletedProperty = await deletePropertyDb(req.params.id);
        res.json({ message: 'Property deleted successfully', user: deletedProperty});
    } catch (error) {
        console.error('Error in deleteProperty:', error);
        next(error);
    }
}

exports.deletePropertyImage = async (req, res, next) => {
    try {
        console.log('deletePropertyImage called with params:', req.params);
        const { imageId } = req.params; // No need for `ref`
        console.log(`Received imageId=${imageId}`);

        // Delete the image from the database
        const deletedImage = await deleteImageDb(imageId); // Pass only `imageId`

        if (!deletedImage) {
            console.warn(`No image found with id=${imageId}`);
            return res.status(404).json({ message: 'Image not found' });
        }

        // Correct file handling to avoid EXDEV error
        const fs = require('fs');
        const path = require('path');

        // Extract the image URL and resolve the file path
        const imageUrl = deletedImage.url;
        const filePath = path.join('uploads', path.basename(imageUrl));

        // Attempt to delete the file
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`File deleted: ${filePath}`);
        } else {
            console.warn(`File not found: ${filePath}`);
        }

        res.status(200).json({ message: 'Image deleted successfully' });

    } catch (error) {
        console.error('Error in deletePropertyImage:', error);
        next(error);
    }
};

exports.deletePropertyDocument = async (req, res, next) => {
    try {
        const { documentId } = req.params; 

        // Delete the document from the database
        const deletedDocument = await deleteDocumentDb(documentId); 

        if (!deletedDocument) {
            console.warn(`No document found with id=${documentId}`);
            return res.status(404).json({ message: 'Document not found' });
        }

        // Correct file handling to avoid EXDEV error
        const fs = require('fs');
        const path = require('path');

        // Extract the document URL and resolve the file path
        const documentUrl = deletedDocument.url;
        const filePath = path.join('documentos', path.basename(documentUrl));

        // Attempt to delete the file
        if (fs.existsSync(filePath)){
            fs.unlinkSync(filePath);
            console.log(`File deleted: ${filePath}`);
        }   else {
            console.warn(`File not found: ${filePath}`);
        }

        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        console.error('Error in deletePropertyDocument:', error);
        next(error);
    }
};

exports.deletePropertyVideo = async (req, res, next) => {
    try {
        const { videoId } = req.params;
        const deletedVideo = await deleteVideoDb(videoId);
        if (!deletedVideo) {
            return res.status(404).json({ message: 'Video not found' });
        }
        // Resolve file path and delete file if exists
        const videoUrl = deletedVideo.url;
        const filePath = path.join('videos', path.basename(videoUrl));
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`File deleted: ${filePath}`);
        } else {
            console.warn(`File not found: ${filePath}`);
        }
        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        console.error('Error in deletePropertyVideo:', error);
        next(error);
    }
};

exports.deletePropertyPlano = async (req, res, next) => {
    try {
        const { planoId } = req.params;
        const deletedPlano = await deletePropertyPlanoDb(planoId);
        if (!deletedPlano) {
            return res.status(404).json({ message: 'Plano not found' });
        }
        // Resolve file path to delete file from storage
        const planoUrl = deletedPlano.url;
        const filePath = path.join('planos', path.basename(planoUrl));
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`File deleted: ${filePath}`);
        } else {
            console.warn(`File not found: ${filePath}`);
        }
        res.status(200).json({ message: 'Plano deleted successfully' });
    } catch (error) {
        console.error('Error in deletePropertyPlano:', error);
        next(error);
    }
};

exports.deletePropertyCertificado = async (req, res, next) => {
    try { 
        const { certificadoId} = req.params;
        const deletedCertificado = await this.deletePropertyCertificadoDb(certificadoId);
        if (!deletedCertificado) {
            return res.status(404).json({ message: 'Certificado not found' });
        }
        const certificadoUrl = deletedCertificado.url;
        const filePath = path.join('certificados', path.basename(certificadoUrl));
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`File deleted: ${filePath}`);
        }
        else {
            console.warn(`File not found: ${filePath}`);
        }
        res.status(200).json({ message: 'Certificado deleted successfully' });
    } catch (error) {
        console.error('Error in deletePropertyCertificado:', error);
        next(error);
    }
};








