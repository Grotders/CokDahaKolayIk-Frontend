import axios from "axios";

let localhostURL = "http://localhost:8080";
let apiURL = "/api/v1/overtimes";

export default class OvertimeService {

    createOvertime(overtime) {
        console.log(overtime);
        return axios.post(localhostURL + apiURL, {
            overtimeDate: overtime.overtimeDate,
            description: overtime.description,
            amountOvertime: overtime.amountOvertime,
            employeeId: overtime.employeeId
        })
    }

    getOvertimes(id, page) {
        return axios.get(localhostURL + apiURL + "?employeeId=" + id + "&page=" + page);
    }

    getOvertime(id) {
        return axios.get(localhostURL + apiURL + "/" + id );
    }

    updateOvertime(id, overtime) {
        return axios.put(localhostURL + apiURL + "/" + overtime.id, {
            overtimeDate: overtime.overtimeDate,
            description: overtime.description,
            amountOvertime: overtime.amountOvertime,
            employeeId: id
        })
    }

    deleteOvertime(id) {
        return axios.delete(localhostURL + apiURL + "/" + id);
    }
}