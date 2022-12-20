import axios from "axios";

let localhostURL = "http://localhost:8080";
let apiURL = "/api/v1/enums";

export default class EnumService{
    
    getDepartments() {
        return axios.get(localhostURL + apiURL + "/departments")
    }

    getLevels() {
        return axios.get(localhostURL + apiURL + "/levels")
    }
    getTiers() {
        return axios.get(localhostURL + apiURL + "/tiers")
    }
    getTitles() {
        return axios.get(localhostURL + apiURL + "/titles")
    }
}