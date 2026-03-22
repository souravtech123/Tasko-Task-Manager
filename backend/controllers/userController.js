/**
 * User Controller
 * Handles user-related endpoints (dashboard, profile)
 */
import User from '../models/User.js';

/**
 * GET /api/user/dashboard
 * Return current user data for dashboard (protected)
 */
export async function getDashboard(req, res) {
  try {
    const user = await User.findById(req.session.userId).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
}
