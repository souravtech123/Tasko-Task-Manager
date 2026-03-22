/**
 * Authentication Middleware
 * Protects routes that require a logged-in user
 */
export function requireAuth(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }
  res.status(401).json({ success: false, message: 'Authentication required' });
}
