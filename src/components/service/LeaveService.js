import axios from "axios";

let localhostURL = "http://localhost:8080";
let apiURL = "/api/v1/leaves";

export default class LeaveService {
    
    createLeave(leave) {
        console.log(leave);
        return axios.post(localhostURL + apiURL, {
            type: leave.type,
            startDate: leave.startDate,
            endDate: leave.endDate,
            description: leave.description,
            employeeId: leave.employeeId
        })
    }

    getLeaves(id, page) {
        return axios.get(localhostURL + apiURL + "?employeeId=" + id + "&page=" + page);
    }

    getLeave(id) {
        return axios.get(localhostURL + apiURL + "/" + id );
    }

    updateLeave(id, leave) {
        return axios.put(localhostURL + apiURL + "/" + leave.id, {
            type: leave.type,
            startDate: leave.startDate,
            endDate: leave.endDate,
            description: leave.description,
            employeeId: id
        })
    }

    deleteLeave(id) {
        return axios.delete(localhostURL + apiURL + "/" + id);
    }
}