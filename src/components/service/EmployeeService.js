import axios from "axios";

let localhostURL = "http://localhost:8080";
let apiURL = "/api/v1/employees";

export default class EmployeeService{

    
    
    createEmployee(employee) {
        console.log("Create service ");
        console.log(employee)

        return axios.post(localhostURL + apiURL, {
            email: employee.email,
            firstname: employee.firstname,
            lastname: employee.lastname,
            birthdate: employee.birthdate,
            salary: employee.salary,
            developerLevel: employee.developerLevel,
            startWorkDate: employee.startWorkDate,
            developerTitle: employee.developerTitle,
            developerTier: employee.developerTier,
            department: employee.department,
            phoneNumber: employee.phoneNumber,
            addressLine: employee.addressLine,
            city: employee.city,
            country: employee.country,
            postcode: employee.postcode
        }
        );
    }

    getEmployee(id) {
        return axios.get(localhostURL + apiURL + "/" + id);
    }

    updateEmployee(id, employee) {
        console.log("Update service ");
        console.log(employee)

        return axios.put(localhostURL + apiURL + "/" + id, {
            email: employee.email,
            firstname: employee.firstname,
            lastname: employee.lastname,
            birthdate: employee.birthdate,
            salary: employee.salary,
            developerLevel: employee.developerLevel,
            startWorkDate: employee.startWorkDate,
            developerTitle: employee.developerTitle,
            developerTier: employee.developerTier,
            department: employee.department,
            phoneNumber: employee.phoneNumber,
            addressLine: employee.addressLine,
            city: employee.city,
            country: employee.country,
            postcode: employee.postcode
        })
    }

    deleteEmployee(id) {
        return axios.delete(localhostURL + apiURL + "/" + id);
    }
}