import fly from 'flyio';

const base_url = 'http://api.petrack.app';
fly.config.timeout = 3000;
fly.config.baseURL = base_url;
var cloudVersion = '';

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
        const bearer = "Bearer " + token;
        fly.config.headers = {"Authorization": bearer};
    }

    static setupCloudVersion(version) {
        cloudVersion = version;
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
        return fly.get(url);
    }

    static updateProfile(nickname, mobile, email, country, city) {
        const url = base_url + cloudVersion + APIs.updateProfile;
        return fly.post(url, {
            'nickname': nickname,
            'mobile': mobile,
            'email': email,
            'country': country,
            'city': city
        });
    }

    static getPets() {
        const url = base_url + cloudVersion + APIs.getProfile;
        return fly.get(url);
    }

    static getPet(id) {
        const url = base_url + cloudVersion + APIs.getPet;
        return fly.get(url + id);
    }

    static addPet(name, gender, type, birthdate, weight) {
        const url = base_url + cloudVersion + APIs.addPet;
        return fly.post(url, {
            'name': name,
            'gender': gender,
            'type': type,
            'birthdate': birthdate,
            'weight': weight
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
