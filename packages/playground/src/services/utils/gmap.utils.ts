export function openWindow(windowApi: any, gmapMap: any, lat: number, lng: number) {
  if (windowApi && gmapMap) {
    windowApi.setPosition({ lat: lat, lng: lng })
    windowApi.open({ map: gmapMap })
  }
}

export function closeWindow(windowApi: any) {
  if (windowApi) {
    windowApi.close()
  }
}
