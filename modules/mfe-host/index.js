// @rc-ses/mfe-host.js

const getToken = () => {
  // Implementuokite savo funkciją, kaip reikalinga
  return 'some-token';
};

const getServiceFormBaseUrl = () => {
  return '/';
};

const getMFEBaseUrl = () => {
  return '';
};

const getServiceFormUrlFragment = () => {
  return '/service-form';
};

const getOwnedPropertiesUrlFragment = () => {
  return '/owned-properties';
};

const getOrderCreationFormUrlFragment = () => {
  return '/order-creation';
};

const redirectToCart = () => {
  window.location.href = '/cart';
};

const redirectToLanding = () => {
  window.location.href = '/landing';
};

const redirectToSelfServiceDashboard = () => {
  window.location.href = '/self-service-dashboard';
};

const redirectToSelfServiceDashboardWithError = (type) => {
  const errorUrls = {
    failedToRetrieveOrderData: '/self-service-dashboard-error/order',
    failedToRetrieveListData: '/self-service-dashboard-error/list',
  };
  window.location.href = errorUrls[type] || '/self-service-dashboard';
};

const redirectToSelfServiceOwnedProperties = () => {
  window.location.href = '/self-service-owned-properties';
};

const redirectToServiceDescriptionPage = (id) => {
  window.location.href = `/service-description/${id}`;
};

const unsupportedServiceRedirect = (id, message) => {
  window.location.href = `/unsupported-service/${id}?message=${encodeURIComponent(
    message,
  )}`;
};

// Eksportuojame funkcijas, kad jas būtų galima naudoti kitur
module.exports = {
  getToken,
  getServiceFormBaseUrl,
  getMFEBaseUrl,
  getServiceFormUrlFragment,
  getOwnedPropertiesUrlFragment,
  getOrderCreationFormUrlFragment,
  redirectToCart,
  redirectToLanding,
  redirectToSelfServiceDashboard,
  redirectToSelfServiceDashboardWithError,
  redirectToSelfServiceOwnedProperties,
  redirectToServiceDescriptionPage,
  unsupportedServiceRedirect,
};
