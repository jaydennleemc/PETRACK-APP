import I18n from 'react-native-i18n';
import en from './locales/en';
import zh_hk from './locales/zh-hk';

I18n.fallbacks = true;

I18n.translations = {
    en,
    zh_hk
};


// I18n.locale = "zh_hk";
//
// getLanguages().then(languages => {
//     console.log(languages); // ['en-US', 'en']
//
//     console.log(I18n.t('greeting'));
// });

export default I18n;
