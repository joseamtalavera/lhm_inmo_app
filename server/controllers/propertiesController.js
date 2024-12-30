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



// put Controllers

exports.updateProperty = async (req, res) => {
    try {
        const id = req.params.id; // or however you retrieve the id
        const property = req.body; // updated property data
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

/* exports.uploadPropertyImage = async (req, res, next) => {
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

        // Fetch the current highest sequence number for this property
        const currentImages = await getPropertyImages(ref);
        const sequenceNumber = currentImages.length + 1;

        // Generate the new file name
        const fileExtension = image.originalname.split('.').pop();
        const fileName = `${ref}-${sequenceNumber}.${fileExtension}`;

        // Correct file handling to avoid EXDEV error
        const fs = require('fs');
        const path = require('path');

        const uploadDir = '/usr/share/nginx/uploads'; // Ensure this matches the uploads directory
        const uploadPath = path.join(uploadDir, fileName);

        // Copy the file instead of renaming (to handle cross-device link issues)
        fs.copyFileSync(image.path, uploadPath);
        fs.unlinkSync(image.path); // Delete the temporary file

         // Generate the URL
         const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
         const domain = process.env.APP_DOMAIN || 'localhost:3010';
         const imageUrl = `${protocol}://${domain}/uploads/${fileName}`;

        // Add metadata for the image
        const principalValue = req.body.principal === 'true' ? 1 : 0;
        const cabeceraValue = req.body.cabecera === 'true' ? 1 : 0;

        const imageDetails ={
            ref, 
            url: imageUrl,
            fototile: req.body.fototitle || '',
            principal: principalValue,
            cabecera: cabeceraValue,
        }

        console.log('Image details:', imageDetails);

        const savedImage = await uploadPropertyImageDb(imageDetails);

        console.log('Saved image:', savedImage);

        res.status(201).json(savedImage);
    } catch (error) {
        console.error('Error in uploadPropertyImage:', error);
        next(error);
    }
}; */

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

        // Fetch the current highest sequence number for this property
        const currentImages = await getPropertyImages(ref);
        const sequenceNumber = currentImages.length + 1;

        // Generate the new file name
        const fileExtension = image.originalname.split('.').pop();
        const fileName = `${ref}-${sequenceNumber}.${fileExtension}`;
        const uploadDir = '/usr/share/nginx/uploads'; // Match NGINX configuration
        const uploadPath = path.join(uploadDir, fileName);

        // Add debugging logs
        console.log('Temporary file path:', image.path);
        console.log('Destination file path:', uploadPath);


        // Rename the file to the final name
        fs.renameSync(image.path, uploadPath); // Move file to the final name
        console.log('File successfully moved to:', uploadPath);

        // Generate the URL
        const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
        const domain = process.env.APP_DOMAIN || 'localhost:3010';
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

        // Fetch the current highest sequence number for this property
        const currentDocuments = await getPropertyDocuments(ref);
        const sequenceNumber = currentDocuments.length + 1;

        // Generate the new file name
        const fileExtension = document.originalname.split('.').pop();
        const fileName = `${ref}-${sequenceNumber}.${fileExtension}`;

        // Correct file handling to avoid EXDEV error
        const fs = require('fs');
        const path = require('path');

        const uploadDir = 'documentos'; // Ensure this matches the uploads directory
        const uploadPath = path.join(uploadDir, fileName);

        // Copy the file instead of renaming (to handle cross-device link issues)
        fs.copyFileSync(document.path, uploadPath);
        fs.unlinkSync(document.path); // Delete the temporary file

         // Generate the URL
         const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
         const domain = process.env.APP_DOMAIN || 'localhost:3010';
         const imageUrl = `${protocol}://${domain}/documentos/${fileName}`;

        const documentDetails ={
            ref, 
            url: imageUrl,
            descripcion: req.body.descripcion || '',
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

exports.sendEmail = async (req, res, next) => {
    const { message, email, telephone, propertyRef } = req.body;

    // Add debugging logs
    console.log('Received request data:', { message, email, telephone, propertyRef });

    try {
        // save the request to the database
        const newRequest = await addRequestDb({ message, email, telephone, propertyRef });

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








