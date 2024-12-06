import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from './Carousel';
import { GlobalStyle } from '../../styles/GlobalStyles';
import ResponsiveDrawer from '../Menu/ResponsiveDrawer';
import Footer from '../home/Footer';
import { 
  carouselContainer, 
  fullScreenContainer, 
  arrowStyle,
  AppContainer,
  DrawerContainer,
  ContentWrapper,
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
  CarouselRequestContainer
} from '../../styles/PropertyPageStyles';
import CheckIcon from '../../styles/CheckIcon';
import RequestBox from './RequestBox';

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
  const [amenities, setAmenities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

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
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  const handleFullScreenToggle = () => {
    setIsFullScreen(!isFullScreen);
  };

  const categorizedAmenities = {
    "Acceso adaptado a personas con movilidad reducida": amenities.filter(amenity => amenity.category === "Acceso adaptado a personas con movilidad reducida"),
    "Equipamiento edificio": amenities.filter(amenity => amenity.category === "Equipamiento edificio"),
    "Vistas": amenities.filter(amenity => amenity.category === "Vistas"),
    "Características de acondicionamiento exterior": amenities.filter(amenity => amenity.category === "Características de acondicionamiento exterior"),
    "Equipamiento adicional": amenities.filter(amenity => amenity.category === "Equipamiento adicional"),
    "Características de acondicionamiento interior": amenities.filter(amenity => amenity.category === "Características de acondicionamiento interior"),
  };

  const handleRequestSubmit = (message) => {
    console.log('Request submitted:', message);
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <DrawerContainer>
          <ResponsiveDrawer />
        </DrawerContainer>

        <ContentWrapper>
          <MainContainer>
            <CarouselRequestContainer>
            <div style={carouselContainer}>
              <Carousel images={images} />
              <div onClick={handleFullScreenToggle}></div>
            </div>

            <div style={{ flex: '1', maxWidth: '300px' }}>
              <RequestBox onSubmitRequest={handleRequestSubmit} />
            </div>
            </CarouselRequestContainer>

            {isFullScreen && (
              <div style={fullScreenContainer}>
                <Carousel images={images} />
                <div style={arrowStyle} onClick={handleFullScreenToggle}></div>
              </div>
            )}

            <ContentWrapperBelowImage>
              <StyledTitle>{property["Título"]}</StyledTitle>
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
                          <Tick><CheckIcon size={20} /></Tick>
                          <AmenityLabel>{amenity.label}</AmenityLabel>
                        </React.Fragment>
                      ))}
                    </AmenitiesContainer>
                  </AmenitySection>
                ))}
              </CollapsibleSection>
              <BlueDivider />
              
              <CollapsibleSection title="Video">
                {/* Add video content here */}
                <p>Video content goes here.</p>
              </CollapsibleSection>
              <BlueDivider />
              
              <CollapsibleSection title="Plano">
                {/* Add map or address details here */}
                <p>Location details go here.</p>
              </CollapsibleSection>
              <BlueDivider />
              
              <CollapsibleSection title="Certificado Energético">
                {/* Add energy certificate info here */}
                <p>Energy certificate details here.</p>
              </CollapsibleSection>
              <BlueDivider />
              <StyledSubtitle>Ubicación</StyledSubtitle>
              
            </ContentWrapperBelowImage>
          </MainContainer>
        </ContentWrapper>

        <Footer />
      </AppContainer>
    </>
  );
};

export default PropertyPage;
