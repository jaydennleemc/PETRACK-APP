import fly from 'flyio';
import {APIs, Config} from "./APIs";

const flyer = fly;
flyer.config.timeout = Config.timeout;

//General routes
export function checkVersion() {
    return flyer.get(APIs.version);
}

export function getAgreement() {
    return flyer.get(APIs.agreement);
}

export function getPrivacy() {
    return flyer.get(APIs.privacy);
}

export function getBreeds() {
    return flyer.get(APIs.breeds);
}

export function sendSMS(mobile) {
    return flyer.post(APIs.sendSMS, {'mobile': mobile});
}

export function validateSMS(mobile, sms) {
    return flyer.post(APIs.validateSMS, {'mobile': mobile, 'code': sms});
}

export function facebookAuth(access_token) {
    const  access_token1 = 'EAAFZB9OAB7rABAKMga6Y2KsibonGRJenhDSXLJRnBEU3huPMVoNUt3d79JhRAgCGo7D22fc6JfdvppRSS0K8nbgHGwVLjupHB3dpvq44feZCxPqobBXOLocHPkZCxmV83aZARuKRsrhYo4ZCNQvV3BZAtJYOBSUwIdHZAD899EmYP9vUOTXADOGov2R1y8jjtzpGo1kDCjl1gZDZD'
    return flyer.post(APIs.facebookAuth, {'access_token': access_token1});
}

export function getProfile() {
    return flyer.get(APIs.getProfile);
}

export function updateProfile(nickname, mobile, email, country, city) {
    return flyer.post(APIs.updateProfile, {
        'nickname': nickname,
        'mobile': mobile,
        'email': email,
        'country': country,
        'city': city
    });
}

export function getPets() {
    return flyer.get(APIs.getPets);
}

export function getPet(id) {
    return flyer.get(APIs.getPet + id);
}

export function addPet(name, gender, type, birthdate, weight) {
    return flyer.post(APIs.addPet, {
        'name': name,
        'gender': gender,
        'type': type,
        'birthdate': birthdate,
        'weight': weight
    });
}

export function deletePet(id) {
    return flyer.delete(APIs.deletePet + id);
}

export function updatePet(id) {
    return flyer.post(APIs.updatePet + id)
}
