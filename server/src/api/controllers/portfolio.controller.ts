import { Request, Response, NextFunction } from 'express';
import PortfolioDetail from '../../models/PortfolioDetails.model';
import { successMiddleware } from '../middlewares/success.middleware';

class PortfolioController {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const portfolios = await PortfolioDetail.find();
      successMiddleware(portfolios, true, res);
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const portfolio = await PortfolioDetail.findById(req.params.id);
      if (!portfolio) return res.status(404).json({ message: 'portfolio not found' });
      successMiddleware(portfolio, true, res);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { portfolioName, portfolioType, idPortfolioLoginDetail } = req.body;

      const portfolio = await PortfolioDetail.create({
        portfolioName,
        portfolioType,
        createdOn: new Date(),
        idPortfolioLoginDetail,
      });
      successMiddleware(portfolio, true, res, 201);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { portfolioName, portfolioType } = req.body;

      const updatedPortfolio = await PortfolioDetail.findByIdAndUpdate(
        id,
        {
          portfolioName,
          portfolioType,
          modifiedOn: new Date(),
        },
        { new: true, runValidators: true }
      );

      if (!updatedPortfolio) {
        return res.status(404).json({ success: false, message: 'Portfolio not found' });
      }

      successMiddleware(updatedPortfolio, true, res, 200);
    } catch (err) {
      next(err);
    }
  }
}

export const portfolioController = new PortfolioController();
