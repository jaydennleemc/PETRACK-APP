import fly from 'flyio';

const base_url = 'http://api.petrack.app';
const flyer = fly;
flyer.config.timeout = 3000;
export var cloudVersion = '';

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
    static checkVersion() {
        const url = base_url + APIs.version;
        return fly.get(url);
    }

    static getAgreement() {
        const url = base_url + APIs.agreement;
        return flyer.get(url);
    }

    static getPrivacy() {
        const url = base_url + APIs.privacy;
        return flyer.get(url);
    }

    static getBreeds() {
        const url = base_url + APIs.breeds;
        return flyer.get(url);
    }

    static sendSMS(mobile, version) {
        const url = base_url + version + cloudVersion + APIs.sendSMS;
        return flyer.post(url, {'mobile': mobile});
    }

    static validateSMS(mobile, sms, version) {
        const url = base_url + version + cloudVersion + APIs.validateSMS;
        return flyer.post(url, {'mobile': mobile, 'code': sms});
    }

    static facebookAuth(access_token, version) {
        const url = base_url + version + cloudVersion + APIs.facebookAuth;
        return flyer.post(url, {'access_token': access_token});
    }

    static getProfile(version) {
        const url = base_url + version + cloudVersion + APIs.getProfile;
        return flyer.get(url);
    }

    static updateProfile(nickname, mobile, email, country, city, version) {
        const url = base_url + version + cloudVersion + APIs.updateProfile;
        return flyer.post(url, {
            'nickname': nickname,
            'mobile': mobile,
            'email': email,
            'country': country,
            'city': city
        });
    }

    static getPets(version) {
        const url = base_url + version + cloudVersion + APIs.getPets;
        return flyer.get(url);
    }

    static getPet(id, version) {
        const url = base_url + version + cloudVersion + APIs.getPet;
        return flyer.get(url + id);
    }

    static addPet(name, gender, type, birthdate, weight, version) {
        const url = base_url + version + cloudVersion + APIs.addPet;
        return flyer.post(url, {
            'name': name,
            'gender': gender,
            'type': type,
            'birthdate': birthdate,
            'weight': weight
        });
    }

    static deletePet(id, version) {
        const url = base_url + version + cloudVersion + APIs.deletePet;
        return flyer.delete(url + id);
    }

    static updatePet(id, version) {
        const url = base_url + version + cloudVersion + APIs.updatePet;
        return flyer.post(url + id)
    }
}

module.exports = APIService;
