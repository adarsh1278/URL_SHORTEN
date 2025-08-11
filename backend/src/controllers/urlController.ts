import { Request, Response } from 'express';
import { Url } from '../models/Url';
import { nanoid } from 'nanoid';

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return url.startsWith('http://') || url.startsWith('https://');
  } catch {
    return false;
  }
};

const normalizeUrl = (url: string): string => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};

export const shortenUrl = async (req: Request, res: Response) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({
        success: false,
        message: 'Original URL is required'
      });
    }

    const normalizedUrl = normalizeUrl(originalUrl);

    if (!isValidUrl(normalizedUrl)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid URL'
      });
    }

    let existingUrl = await Url.findOne({ originalUrl: normalizedUrl });
    
    if (existingUrl) {
      return res.json({
        success: true,
        data: {
          originalUrl: existingUrl.originalUrl,
          shortUrl: existingUrl.shortUrl,
          shortCode: existingUrl.shortCode
        }
      });
    }

    let shortCode: string;
    let existing;
    
    do {
      shortCode = nanoid(8);
      existing = await Url.findOne({ shortCode });
    } while (existing);

    const baseUrl = process.env.BASE_URL || 'http://localhost:5002';
    const shortUrl = `${baseUrl}/${shortCode}`;

    const newUrl = new Url({
      originalUrl: normalizedUrl,
      shortCode,
      shortUrl
    });

    await newUrl.save();

    res.status(201).json({
      success: true,
      data: {
        originalUrl: newUrl.originalUrl,
        shortUrl: newUrl.shortUrl,
        shortCode: newUrl.shortCode
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const redirectUrl = async (req: Request, res: Response) => {
  try {
    const { shortcode } = req.params;

    if (!shortcode) {
      return res.status(400).json({
        success: false,
        message: 'Short code is required'
      });
    }

    const url = await Url.findOne({ shortCode: shortcode });

    if (!url) {
      return res.status(404).json({
        success: false,
        message: 'URL not found'
      });
    }

    await Url.findByIdAndUpdate(url._id, { $inc: { clicks: 1 } });
    res.redirect(url.originalUrl);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const urls = await Url.find()
      .sort({ createdAt: -1 })
      .select('originalUrl shortCode shortUrl clicks createdAt updatedAt');

    const totalUrls = urls.length;
    const totalClicks = urls.reduce((sum: number, url: any) => sum + url.clicks, 0);

    res.json({
      success: true,
      data: {
        urls,
        totalUrls,
        totalClicks
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
