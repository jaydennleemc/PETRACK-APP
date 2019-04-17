import AsyncStorage from '@react-native-community/async-storage';

export async function storeFacebookToken(token) {
    try {
        await AsyncStorage.setItem('facebookToken', token);
    } catch (error) {
        console.log('cannot store facebook token with error ' + error);
    }
}

export async function getFacebookToken() {
    try {
        const value = await AsyncStorage.getItem('facebookToken');
        if (value !== null) {
            console.log('facebook token: ' + value);
            return value;
        } else {
            return null;
        }
    } catch (error) {
        console.log('cannot get facebook token from storage with error ' + error);
    }
}

export async function storeJWTToken(jwt) {
    try {
        await AsyncStorage.setItem('jwtToken', jwt);
    } catch (error) {
        console.log('cannot store jwt token with error ' + error);
    }
}

export async function getJWTToken() {
    try {
        const value = await AsyncStorage.getItem('jwtToken');
        if (value !== null) {
            console.log('jwt token: ' + value);
        } else {
            return null;
        }
    } catch (error) {
        console.log('cannot get jwt token from storage with error ' + error);
    }
}
