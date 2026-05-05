type DataLayerEvent = {
  event: string;
  form_name: string;
};

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

export function pushDataLayerEvent(event: DataLayerEvent) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

