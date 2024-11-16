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
} = require('../models/propertiesQueries');


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

        // Fetch the current highest sequence number for this property
        const currentImages = await getPropertyImages(ref);
        const sequenceNumber = currentImages.length + 1;

        // Generate the new file name
        const fileExtension = image.originalname.split('.').pop();
        const fileName = `${ref}-${sequenceNumber}.${fileExtension}`;

        // Correct file handling to avoid EXDEV error
        const fs = require('fs');
        const path = require('path');

        const uploadDir = 'uploads'; // Ensure this matches the uploads directory
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
        const { ref, imageId } = req.params;

        // Delete the image from the database
        const deletedImage = await deleteImageDb(ref, imageId);

        if (!deletedImage) {
            console.warn(`No image found with ref=${ref} and id=${imageId}`);
            return res.status(404).json({ message: 'Image not found' });
        }

        // Extract the image URL and resolve the file path
        const imageUrl = deletedImage.url;
        const filePath = path.join('uploads', path.basename(imageUrl));

        // Attempt to delete the file
        if (fs.existsSync(filePath)){
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
}







