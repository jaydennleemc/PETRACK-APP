const base_url = 'http://api.petrack.app';

export const Config = {
    timeout: 3000,
};

export const APIs = {
//basic
    agreement: base_url + '/agreement',
    privacy: base_url + '/privacy',
    version: base_url + '/basic/versions',
    breeds: base_url + '/basic/breeds',
//auth
    sendSMS: base_url + '/auth/mobile/sendSMS',
    validateSMS: base_url + '/auth/mobile/validate',
    facebookAuth: base_url + '/auth/facebook',

//Profile
    getProfile: base_url + '/me/profile',
    updateProfile: base_url + '/me/profile/update',
//Pet
    getPets: base_url + '/me/pets',
    getPet: base_url + '/me/pet/',
    addPet: base_url + '/me/pet/add',
    deletePet: base_url + '/me/pet/remove/',
    updatePet: base_url + '/me/pet/update/'

};

