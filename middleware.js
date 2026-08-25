export const config = {
  matcher: '/admin/:path*',
}

export default function middleware(req) {
  const basicAuth = req.headers.get('authorization')

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = atob(authValue).split(':')

    if (user === process.env.ADMIN_USER && pwd === process.env.ADMIN_PASS) {
      return
    }
  }

  return new Response('Auth required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
  })
}
