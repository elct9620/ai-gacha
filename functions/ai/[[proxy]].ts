const ProxyTarget = 'https://api.replicate.com/v1'

export async function onRequest({ request }) {
  const rawURL = new URL(request.url)
  const targetURL = new URL(`${ProxyTarget}${rawURL.pathname.replace(/^\/ai/, '')}`)
  const proxyRequest = new Request(targetURL, request)
  return await fetch(proxyRequest)
}
