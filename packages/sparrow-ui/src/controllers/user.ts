
import { Request, Response } from "express";
/**
 * GET /login
 * Login page.
 */
export const getLogin = (req: Request, res: Response) => {
    res.json({
        title: "Login"
    });
};


export const index = (req: Request, res: Response) => {
  res.json({
      title: "test"
  });
};
