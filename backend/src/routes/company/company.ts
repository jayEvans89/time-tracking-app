import express from "express";
import CompanyController from '@/controllers/company/company.controller';

export const company = express.Router()

const companyController  = new CompanyController()

/**
 * Update a company
 */
company.put('update/:id', (req, res) => {
  companyController.updateCompany(req, res)
})
