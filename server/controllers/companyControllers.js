const companyService = require('../services/companyServices');


const getCompanies = async(req, res) => {
    const companies = await companyService.getAllCompanies();

    res.json(companies);
}

const getCompanyId = async(req, res) => {
    const id = req.params.id;
    const company = await companyService.getCompanyById(id);

    if (!company) {
        return res.json({"message": "company not found."})
    }

    res.json(company);
}

const createCompany = async(req, res) => {
    const data = req.body;
    const new_company = await companyService.createCompany(data);

    res.status(201).json({
        message: "company created successfully",
        new_company
    });
}

module.exports = {
    getCompanies,
    getCompanyId,
    createCompany
};