import fly from 'flyio';

const base_url = 'http://api.petrack.app';
fly.config.timeout = 3000;
fly.config.baseURL = base_url;
var cloudVersion = '';
var jwtToken = '';

const APIs = {
//basic
    agreement: '/agreement',
    privacy: '/privacy',
    version: '/basic/versions',
    breeds: '/basic/breeds',
//auth
    sendSMS: '/auth/mobile/sendSMS',
    validateSMS: '/auth/mobile/validate',
    facebookAuth: '/auth/facebook',

//Profile
    getProfile: '/me/profile',
    updateProfile: '/me/profile/update',
//Pet
    getPets: '/me/pets',
    getPet: '/me/pet/',
    addPet: '/me/pet/add',
    deletePet: '/me/pet/remove/',
    updatePet: '/me/pet/update/'

};


class APIService {

    static setupJWTToken(token) {
        jwtToken = token;
    }

    static setupCloudVersion(version) {
        cloudVersion = version;
    }

    static getRequest(url) {
        return fly.get(url);
    }

    static postRequest(url, body) {
        return fly.post(url, body);
    }

    static checkVersion() {
        const url = base_url + APIs.version;
        return fly.get(url);
    }

    static getAgreement() {
        const url = base_url + APIs.agreement;
        return fly.get(url);
    }

    static getPrivacy() {
        const url = base_url + APIs.privacy;
        return fly.get(url);
    }

    static getBreeds() {
        const url = base_url + APIs.breeds;
        return fly.get(url);
    }

    static sendSMS(mobile) {
        const url = base_url + cloudVersion + APIs.sendSMS;
        return fly.post(url, {'mobile': mobile});
    }

    static validateSMS(mobile, sms) {
        const url = base_url + cloudVersion + APIs.validateSMS;
        return fly.post(url, {'mobile': mobile, 'code': sms});
    }

    static facebookAuth(access_token) {
        const url = base_url + cloudVersion + APIs.facebookAuth;
        return fly.post(url, {'access_token': access_token});
    }

    static getProfile() {
        const url = base_url + cloudVersion + APIs.getProfile;
        const bearer = "Bearer " + jwtToken;
        return fly.get(url, {}, {
            headers: {"Authorization": bearer}
        });
    }

    static updateProfile(nickname, mobile, email, country, city) {
        const url = base_url + cloudVersion + APIs.updateProfile;
        const bearer = "Bearer " + jwtToken;
        return fly.post(url, {
            'nickname': nickname,
            'mobile': mobile,
            'email': email,
            'country': country,
            'city': city
        }, {
            headers: {"Authorization": bearer}
        });
    }

    static getPets() {
        const url = base_url + cloudVersion + APIs.getProfile;
        const bearer = "Bearer " + jwtToken;
        return fly.get(url, {}, {
            headers: {"Authorization": bearer}
        });
    }

    static getPet(id) {
        const url = base_url + cloudVersion + APIs.getPet;
        return fly.get(url + id);
    }

    static addPet(name, gender, type, birthdate, weight) {
        const url = base_url + cloudVersion + APIs.addPet;
        const bearer = "Bearer " + jwtToken;
        return fly.post(url, {
            'name': name,
            'gender': gender,
            'type': type,
            'birthdate': birthdate,
            'weight': weight
        }, {
            headers: {"Authorization": bearer}
        });
    }

    static deletePet(id) {
        const url = base_url + cloudVersion + APIs.deletePet;
        return fly.delete(url + id);
    }

    static updatePet(id) {
        const url = base_url + cloudVersion + APIs.updatePet;
        return fly.post(url + id)
    }
}

module.exports = APIService;
