import fly from 'flyio';

const base_url = 'http://api.petrack.app';
fly.config.timeout = 3000;
fly.config.baseURL = base_url;
var cloudVersion = '';
var jwtToken = '';

const APIs = {
//    Basic API
    agreement: '/agreement',
    privacy: '/privacy',
    version: '/basic/versions',
    breeds: '/basic/breeds',
//     Auth API
    sendSMS: '/auth/mobile/sendSMS',
    validateSMS: '/auth/mobile/validate',
    facebookAuth: '/auth/facebook',
    signOut: '/auth/logout',

//    Profile API
    getProfile: '/me/profile',
    updateProfile: '/me/profile/update',
//    Pet API
    getPets: '/me/pets',
    getPet: '/me/pet/',
    addPet: '/me/pet/add',
    deletePet: '/me/pet/remove/',
    updatePet: '/me/pet/update/',
//    Clips API
    getClips: '/me/clips',
    getClip: '/me/clip/',
    addClip: '/me/clip/add',
    removeClip: '/me/clip/remove/',
    updateClip: '/me/clip/update/',
//    Dispenser API
    findNearby: '/dispensers/findNearby',
    findDispenser: '/dispenser/',
    addDispenser: '/dispenser/add',
    removeDispenser: '/dispenser/remove/',
    updateDispenser: '/dispenser/update/',
    activateDispenser: '/dispenser/activate/',
    deactivateDispenser: '/dispenser/deactivate/'

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

    static getRequest(url, query, config) {
        return fly.get(url, query, config);
    }

    static postRequest(url, body, config) {
        return fly.post(url, body, config);
    }

    static checkVersion() {
        const url = APIs.version;
        return fly.get(url);
    }

    static getAgreement() {
        const url = APIs.agreement;
        return fly.get(url);
    }

    static getPrivacy() {
        const url = APIs.privacy;
        return fly.get(url);
    }

    static getBreeds() {
        const url = APIs.breeds;
        return fly.get(url);
    }

    static sendSMS(mobile) {
        const url = cloudVersion + APIs.sendSMS;
        return fly.post(url, {'mobile': mobile});
    }

    static validateSMS(mobile, sms) {
        const url = cloudVersion + APIs.validateSMS;
        return fly.post(url, {'mobile': mobile, 'code': sms});
    }

    static facebookAuth(access_token) {
        const url = cloudVersion + APIs.facebookAuth;
        return fly.post(url, {'access_token': access_token});
    }

    static getProfile() {
        const url = cloudVersion + APIs.getProfile;
        const bearer = "Bearer " + jwtToken;
        return fly.get(url, {}, {
            headers: {"Authorization": bearer}
        });
    }

    static updateProfile(nickname, mobile, email, country, city) {
        const url = cloudVersion + APIs.updateProfile;
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
        const url = cloudVersion + APIs.getPets;
        const bearer = "Bearer " + jwtToken;
        return fly.get(url, {}, {
            headers: {"Authorization": bearer}
        });
    }

    static getPet(id) {
        const url = cloudVersion + APIs.getPet;
        return fly.get(url + id);
    }

    static addPet(name, gender, type, birthdate, weight) {
        const url = cloudVersion + APIs.addPet;
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
        const url = cloudVersion + APIs.deletePet;
        const bearer = "Bearer " + jwtToken;
        return fly.delete(url + id, {}, {headers: {"Authorization": bearer}});
    }

    static updatePet(id) {
        const url = cloudVersion + APIs.updatePet;
        return fly.post(url + id);
    }

    static signOut() {
        const url = cloudVersion + APIs.signOut;
        const bearer = "Bearer " + jwtToken;
        return fly.post(url);
    }

    // Clips
    static getClips() {
        const url = cloudVersion + APIs.getClips;
        return fly.get(url);
    }

    static getClip(id) {
        const url = cloudVersion + APIs.getClip + id;
        return fly.get(url);
    }

    static addClip(pet, deviceName, deviceAddr, battery) {
        const url = cloudVersion + APIs.addClip;
        const bearer = "Bearer " + jwtToken;
        return fly.post(url, {
            'pet': pet,
            'deviceName': deviceName,
            'deviceAddr': deviceAddr,
            'battery': battery,
        }, {
            headers: {"Authorization": bearer}
        });
    }

    static removeClip(id) {
        const url = cloudVersion + APIs.removeClip + id;
        return fly.delete(url);
    }

    static updateClip(id, dailySteps, lost, battery) {
        const url = cloudVersion + APIs.updateClip + id;
        const bearer = "Bearer " + jwtToken;
        return fly.put(url, {
            'dailySteps': dailySteps,
            'lost': lost,
            'battery': battery,
        }, {
            headers: {"Authorization": bearer}
        })
    }


    // Dispenser
    static findNearBy(lat, long, radius) {
        const url = cloudVersion + APIs.findNearby;
        const bearer = "Bearer " + jwtToken;
        return fly.get(url, `lat=${lat}&long=${long}&radius=${radius}`, {
            headers: {"Authorization": bearer}
        })
    }

    static findDispenser(id) {
        const url = cloudVersion + APIs.findDispenser + id;
        const bearer = "Bearer " + jwtToken;
        return fly.get(url);
    }

    static addDispenser() {
        const url = cloudVersion + APIs.addDispenser;
        const bearer = "Bearer " + jwtToken;
        return fly.put(url, {
            'dailySteps': dailySteps,
            'lost': lost,
            'battery': battery,
        }, {
            headers: {"Authorization": bearer}
        })
    }

    static removeDispenser(id) {
        const url = cloudVersion + APIs.removeDispenser + id;
        const bearer = "Bearer " + jwtToken;
        return fly.delete(url);
    }

    static updateDispenser(id) {
        const url = cloudVersion + APIs.updateDispenser + id;
        const bearer = "Bearer " + jwtToken;
    }

    static activateDispenser(id) {
        const url = cloudVersion + APIs.activateDispenser + id;
        const bearer = "Bearer " + jwtToken;
        return fly.put(url, {}, {
            headers: {"Authorization": bearer}
        });
    }

    static deactivateDispenser(id) {
        const url = cloudVersion + APIs.deactivateDispenser + id;
        const bearer = "Bearer " + jwtToken;
        return fly.put(url, {}, {
            headers: {"Authorization": bearer}
        });
    }


}

module.exports = APIService;
