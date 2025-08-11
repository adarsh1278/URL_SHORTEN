import { Router } from 'express';
import { shortenUrl, getAnalytics } from '../controllers/urlController';

const router = Router();

router.post('/shorten', shortenUrl);
router.get('/analytics', getAnalytics);

export default router;
