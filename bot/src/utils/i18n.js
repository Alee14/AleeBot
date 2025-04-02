import i18next from 'i18next';
import fsBackend from 'i18next-fs-backend';
const fallbackLanguage = 'en';

i18next.use(fsBackend).init({
    debug: true,
    fallbackLng: fallbackLanguage,
    backend: {
        loadPath: './src/translations/{{lng}}/{{ns}}.json'
    }
});
