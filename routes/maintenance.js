import { query } from '../config/db.js';

const maintenanceMiddleware = async (req, res, next) => {
  try {
    const result = await query("SELECT maintenance_mode, maintenance_message FROM adminCredentials WHERE id = 1");
    const settings = result.rows[0];
    if (settings && settings.maintenance_mode && !req.path.startsWith('/backend') && req.path !== '/maintenance') {
      return res.render('maintenance.ejs', { message: settings.maintenance_message || 'Site is under maintenance.' });
    }
  } catch (err) {
    console.error('Error checking maintenance mode:', err);
  }
  next();
};

export default maintenanceMiddleware;