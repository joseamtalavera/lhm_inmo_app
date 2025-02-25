import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Carousel from './Carousel';
import { GlobalStyle } from '../../styles/GlobalStyles';
import ResponsiveDrawer from '../Menu/ResponsiveDrawer';
import Footer from '../home/Footer';
import { 
  AppContainer,
  DrawerContainer,
  MainContainer,
  ContentWrapperBelowImage,
  StyledTitle,
  StyledSubtitle,
  PropertyDetailsRow,
  PropertyDetailLocalidad,
  PropertyDetailPrecio,
  AmenitiesContainer,
  Tick,
  AmenityLabel,
  AmenitySection,
  AmenityTitle,
  CollapsibleHeader,
  PlusMinus,
  PropertyInfoContainer,
  PropertyInfoItem,
  BlueDivider,
  CarouselRequestContainer,
  StyledCarouselContainer,
  StyledArrow,
  StyledFullScreenContainer,  
  PropertyDetailRef,
  FloatingArrow,
  CenteredContentWrapper,
  CenteredRequestBoxContainer
} from '../../styles/PropertyPageStyles';
import ArrowIconIosIcon from '@mui/icons-material/ArrowBackIos';
import CheckIcon from '../../styles/CheckIcon';
import RequestBox from './RequestBox';
import { CircularProgress, Box } from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import styled from 'styled-components';

// Remove inline declarations of CenteredContentWrapper and CenteredRequestBoxContainer and import them:

const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div>
      <CollapsibleHeader onClick={toggleOpen}>
        <StyledSubtitle>{title}</StyledSubtitle>
        <PlusMinus>{isOpen ? '-' : '+'}</PlusMinus>
      </CollapsibleHeader>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

const primaryFields = [
  "Ref", "Dirección", 
  "Localidad", "Provincia", "Pais", "CP", "Longitud", "Latitud", "M.Constr", "M.Utiles", "M.Parcela", "Tipo", "Habitaciones", "Baños", "Aseos", "Estado",
  "Año.Const", "Calific", "Cargas", "Planta", "Ori.Entrada", "Ori.Ventana", "Cert.Ener", "Valor.C.E", "CO2/m2/Año", 
  "Kw/Año", "T.IBI", "T.VADO", "T.Rústico", "Gerencia", "Gastos", "Comunidad", "Derrama", "Cons.Elect", 
  "Cons.Agua", "Internet", "Gas", "ITE", "Termo.Agua", "Sum.Agua"
];

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [images, setImages] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null); // Added video state
  const [planosUrl, setPlanosUrl] = useState(null); // New planos state
  const [certificateUrl, setCertificateUrl] = useState(null); // New certificate state
  const [amenities, setAmenities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [hideWhatsApp, setHideWhatsApp] = useState(false);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchProperty = async () => {
      setIsLoading(true);
      try {
        const propertyresponse = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${id}`);
        if (!propertyresponse.ok) {
          throw new Error('Failed to fetch property');
        }
        const data = await propertyresponse.json();
        console.log('Fetch propertyData:', data);

        const transformedData = {
          Ref: data.ref,
          RefExt: data.refext,
          Precio: data.precio,
          Título: data.title,
          Dirección: data.direccion,
          Localidad: data.localidad,
          Provincia: data.provincia,
          Pais: data.pais,
          CP: data.cp,
          Longitud: data.longitud,
          Latitud: data.latitud,
          "M.Constr": data.metrosconstruidos,
          "M.Utiles": data.metrosutiles,
          "M.Parcela": data.metrosparcela,
          Tipo: data.tipo_propiedad,
          Habitaciones: data.habitaciones,
          Baños: data.banos,
          Aseos: data.aseos,
          Estado: data.estado,
          "Año.Const": data.anoconstruccion,
          Calific: data.calificacion,
          Cargas: data.cargas,
          Planta: data.planta,
          "Ori.Entrada": data.orientacionentrada,
          "Ori.Ventana": data.orientacionventana,
          "Cert.Ener": data.certificadoenergetico,
          "Valor.C.E": data.valorcertificadoenergetico,
          "CO2/m2/Año": data.co2certificadoenergetico,
          "Kw/Año": data.kwcertificadoenergetico,
          "T.IBI": data.tributoibi,
          "T.VADO": data.tributovado,
          "T.Rústico": data.tributorustico,
          Gastos: data.gastosvarios,
          Gerencia: data.gerencia,
          Comunidad: data.comunidadgastos,
          Derrama: data.comunidadderrama,
          "Cons.Elect": data.consumoelecticidad,
          "Cons.Agua": data.consumoagua,
          Internet: data.internet,
          Gas: data.gas,
          ITE: data.ite,
          "Termo.Agua": data.termoagua,
          "Sum.Agua": data.tipoagua,
          Activa: data.active,
          Foto: data.foto,
          Destacada: data.destacada,
          CreatedAt: data.created_at,
          UpdatedAt: data.updated_at,
          "Descripción": data.description
        };

        const imagesresponse = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${data.ref}/images`);
        if (!imagesresponse.ok) {
          throw new Error('Failed to fetch images');
        }
        const imagesData = await imagesresponse.json();

        const amenitiesresponse = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${data.ref}/amenities`);
        if (!amenitiesresponse.ok) {
          throw new Error('Failed to fetch amenities');
        }
        const amenitiesData = await amenitiesresponse.json();

        setProperty(transformedData);
        setImages(imagesData);
        setAmenities(amenitiesData);

        // Fetch video similar to images
        const videoResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${data.ref}/videos`);
        if (videoResponse.ok) {
          const videoData = await videoResponse.json();
          
          // If videoData is an array, extract the first URL
          if (Array.isArray(videoData) && videoData.length > 0) {
            setVideoUrl(videoData[0].url);
          }
        }

        // New fetch for planos
        const planosResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${data.ref}/planos`);
        if (planosResponse.ok) {
          const planosData = await planosResponse.json();
          console.log("Planos Data:", planosData); // Log the fetched planos data
          if (Array.isArray(planosData) && planosData.length > 0) {
            setPlanosUrl(planosData[0].url);
          }
        }

        // New fetch for certificate
        const certResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${data.ref}/certificados`);
        if (certResponse.ok) {
          const certData = await certResponse.json();
          if (Array.isArray(certData) && certData.length > 0) {
            setCertificateUrl(certData[0].url);
          }
        }
      } catch (error) {
          console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  useEffect(() => {
    const handleResize = () => setHideWhatsApp(window.innerWidth < 1025);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  const handleFullScreenToggle = () => {
    setIsFullScreen(!isFullScreen);
  };

  const mapContainerStyle = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: property.Longitud,
    lng: property.Latitud
  };

  const categorizedAmenities = {
    "Acceso adaptado a personas con movilidad reducida": amenities.filter(amenity => amenity.category === "Acceso adaptado a personas con movilidad reducida"),
    "Equipamiento edificio": amenities.filter(amenity => amenity.category === "Equipamiento edificio"),
    "Vistas": amenities.filter(amenity => amenity.category === "Vistas"),
    "Características de acondicionamiento exterior": amenities.filter(amenity => amenity.category === "Características de acondicionamiento exterior"),
    "Equipamiento adicional": amenities.filter(amenity => amenity.category === "Equipamiento adicional"),
    "Características de acondicionamiento interior": amenities.filter(amenity => amenity.category === "Características de acondicionamiento interior"),
  };

  const displayedImages = images.length > 0 
    ? images 
    : [{ url: 'https://via.placeholder.com/800x400?text=No+Image+Available' }];

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <DrawerContainer>
          <ResponsiveDrawer />
        </DrawerContainer>
        <FloatingArrow onClick={() => navigate(-1)} aria-label="Volver">
          <ArrowIconIosIcon />
        </FloatingArrow>

        {/* Using the new styled component */}
        <CenteredContentWrapper>
          <MainContainer>
            <StyledTitle>{property["Título"]}</StyledTitle>
            {/* New parent flex container to hold carousel and request box separately */}
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <CarouselRequestContainer style={{ flex: 3 }}>
                <StyledCarouselContainer>
                  <Carousel images={displayedImages} />
                  <StyledArrow onClick={handleFullScreenToggle} />
                </StyledCarouselContainer>
              </CarouselRequestContainer>
            </div>

            {isFullScreen && (
              <StyledFullScreenContainer>
                <Carousel images={displayedImages} />
                <StyledArrow onClick={handleFullScreenToggle} />
              </StyledFullScreenContainer>
            )}

            <ContentWrapperBelowImage>
              <PropertyDetailRef>Ref: {property["Ref"]}</PropertyDetailRef>
              <PropertyDetailsRow>
                <PropertyDetailLocalidad>{property["Localidad"]}</PropertyDetailLocalidad>
                <PropertyDetailPrecio>{property["Precio"]} €</PropertyDetailPrecio>
              </PropertyDetailsRow>
              <BlueDivider />
              <StyledSubtitle>Descripción</StyledSubtitle>
              <p>{property["Descripción"]}</p>
              <BlueDivider />

              <CollapsibleSection title="Informacion General">
                <PropertyInfoContainer>
                  {primaryFields.map((field) => {
                    const value = property[field];
                    if (!value || value === 0) return null; // Excludes null, undefined, empty strings, and 0
                    return (
                      <PropertyInfoItem key={field}>
                        <strong>{field}:</strong> {value.toString()}
                      </PropertyInfoItem>
                    );
                  })}
                </PropertyInfoContainer>
              </CollapsibleSection>
              <BlueDivider />

              <CollapsibleSection title="Características Básicas">
                {Object.keys(categorizedAmenities).map((category, index) => (
                  <AmenitySection key={index}>
                    <AmenityTitle>{category}</AmenityTitle>
                    <AmenitiesContainer>
                      {categorizedAmenities[category].map((amenity, i) => (
                        <React.Fragment key={i}>
                          <Tick>
                            <CheckIcon size={20} />
                          </Tick>
                          <AmenityLabel>{amenity.label}</AmenityLabel>
                        </React.Fragment>
                      ))}
                    </AmenitiesContainer>
                  </AmenitySection>
                ))}
              </CollapsibleSection>
              <BlueDivider />

              <CollapsibleSection title="Video">
                {/* Render the video only if videoUrl is available */}
                { videoUrl ? (
                  <video controls width="100%">
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <p>No video available</p>
                )}
              </CollapsibleSection>
              <BlueDivider />

                {/* Ojo: if docuement is jpg will render. Otherwise offer the option to download */}
              <CollapsibleSection title="Plano">
                { planosUrl ? (
                  planosUrl.toLowerCase().endsWith('.pdf') ? (
                    <object data={planosUrl} type="application/pde" width="100%" height="600px">
                      <p> Para obtener el plano en PDF, por favor haz click <a href={planosUrl} style={{ textDecoration: 'underline', maginLeft: '4px'}}>Aquí</a>.</p>
                      </object>
                      ):(                  
                        <img src={planosUrl} alt="Plano" style={{ width: "100%" }} />
                      )
                ) : (
                  <p>No plano available</p>
                )}
              </CollapsibleSection>
              <BlueDivider />

              <CollapsibleSection title="Certificado Energético">
                { certificateUrl ? (
                  certificateUrl.toLowerCase().endsWith('.pdf') ? (
                    <object data={certificateUrl} type="application/pdf" width="100%" height="600px">
                      <p>Para obtener un PDF, por favor haz click <a href={certificateUrl} style={{ textDecoration: 'underline', marginLeft: '4px' }}>Aquí</a>.</p>
                    </object>
                  ) : (
                    <img src={certificateUrl} alt="Certificado Energético" style={{ width: "100%" }} />
                  )
                ) : (
                  <p>No energy certificate available</p>
                )}
              </CollapsibleSection>
              <BlueDivider />

              <StyledSubtitle>Ubicación</StyledSubtitle>
              <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={13}>
                  <Marker position={center} />
                </GoogleMap>
              </LoadScript>
            </ContentWrapperBelowImage>
          </MainContainer>
        </CenteredContentWrapper>

        {/* Using the new styled RequestBox container */}
        <CenteredRequestBoxContainer>
          <RequestBox propertyRef={property.Ref} />
        </CenteredRequestBoxContainer>

        <Footer hideWhatsApp={hideWhatsApp}/> 
      </AppContainer>
    </>
  );
};

export default PropertyPage;
