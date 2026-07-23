const fs = require("fs");
const path = require("path");

const company_PATH = path.join(__dirname, "../database/companies.json");


function getAllCompanies() {
    const data = JSON.parse(fs.readFileSync(company_PATH, "utf8"));

    return data.companies;
}

async function getCompanyById(id) {
    const companys = await getAllCompanies();
    const companyId = await companys.find(c => c.id === Number(id));

    return companyId;
}

async function createCompany(company_data) {
    const companys = await getAllCompanies();

    const new_company = {
        id: companys.length > 0 
            ? companys[companys.length - 1].id + 1 
            : 1,

        ...company_data,
        createdAt: new Date().toISOString().split("T")[0]
    }

    companys.push(new_company);

    fs.writeFileSync(
        company_PATH,
        JSON.stringify(companys, null, 2)
    );

    return true;
}

// async function updatecompanyId(id, data) {
//     const companys = await getAllcompanys();
//     const companyId = await companys.find(j => j.id === id);

//     if (!companyId) return;

//     const data = 

//     return companyId;
// }

module.exports = {
    getAllCompanies,
    getCompanyById,
    createCompany
};