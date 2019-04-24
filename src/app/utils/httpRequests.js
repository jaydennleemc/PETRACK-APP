import fly from 'flyio';

const base_url = 'http://api.petrack.app';
const flyer = fly;
flyer.config.timeout = 3000;

export var cloudVersion = 'v1';

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


//General routes
export function checkVersion() {
    const url = base_url + APIs.version;
    return flyer.get(url);
}

export function getAgreement() {
    const url = base_url + APIs.agreement;
    return flyer.get(url);
}

export function getPrivacy() {
    const url = base_url + APIs.privacy;
    return flyer.get(url);
}

export function getBreeds() {
    const url = base_url + APIs.breeds;
    return flyer.get(url);
}

export function sendSMS(mobile) {
    const url = base_url + '/' + cloudVersion + APIs.sendSMS;
    return flyer.post(url, {'mobile': mobile});
}

export function validateSMS(mobile, sms) {
    const url = base_url + '/' + cloudVersion + APIs.validateSMS;
    return flyer.post(url, {'mobile': mobile, 'code': sms});
}

export function facebookAuth(access_token) {
    const url = base_url + '/' + cloudVersion + APIs.facebookAuth;
    return flyer.post(url, {'access_token': access_token});
}

export function getProfile() {
    const url = base_url + '/' + cloudVersion + APIs.getProfile;
    return flyer.get(url);
}

export function updateProfile(nickname, mobile, email, country, city) {
    const url = base_url + '/' + cloudVersion + APIs.updateProfile;
    return flyer.post(url, {
        'nickname': nickname,
        'mobile': mobile,
        'email': email,
        'country': country,
        'city': city
    });
}

export function getPets() {
    const url = base_url + '/' + cloudVersion + APIs.getPets;
    return flyer.get(url);
}

export function getPet(id) {
    const url = base_url + '/' + cloudVersion + APIs.getPet;
    return flyer.get(url + id);
}

export function addPet(name, gender, type, birthdate, weight) {
    const url = base_url + '/' + cloudVersion + APIs.addPet;
    return flyer.post(url, {
        'name': name,
        'gender': gender,
        'type': type,
        'birthdate': birthdate,
        'weight': weight
    });
}

export function deletePet(id) {
    const url = base_url + '/' + cloudVersion + APIs.deletePet;
    return flyer.delete(url + id);
}

export function updatePet(id) {
    const url = base_url + '/' + cloudVersion + APIs.updatePet;
    return flyer.post(url + id)
}
