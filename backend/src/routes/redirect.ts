import { Router } from 'express';
import { redirectUrl } from '../controllers/urlController';

const router = Router();

router.get('/:shortcode', redirectUrl);

export default router;
