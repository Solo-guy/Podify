import { ErrorRequestHandler } from "express";

export const errorHandle: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).json({ error: err.message });
};