import {  } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import { getLanguageNameByLocale } from '../../../utils';
import { Dropdown } from '../../Dropdown';

export const LanguagePage = () => {
    const router = useRouter();
    const currentLocale = router.locale;

    const onLocaleChange = (locale: string) => {
        router.push(router.asPath, undefined, { locale });
        document.cookie = `NEXT_LOCALE=${locale}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    }
    const languages = [
        {text: 'English', onClick: () => onLocaleChange('en')},
        {text: 'Svenska', onClick: () => onLocaleChange('se')}
    ]
    const active = getLanguageNameByLocale(currentLocale);

    return(
        <div>
            <Dropdown 
                items={languages}
                activeItemText={active}
            />
        </div>
    )
}