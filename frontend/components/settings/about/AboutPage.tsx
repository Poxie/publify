import { useTranslation } from 'next-i18next';
import React from 'react';
import { useReducer } from 'react';
import { useEffect } from 'react';
import { Dispatch } from 'react';
import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthProvider';
import { useChange } from '../../../contexts/ChangeProvider';
import { updateProfile } from '../../../utils';
import { DropdownItem } from '../../Dropdown';
import { SettingsMain } from '../SettingsMain';
import { AboutInput } from './AboutInput';

const initialState = {
    relationship: undefined,
    education: undefined,
    location: undefined
} as {
    relationship: string;
    education: string;
    location: string;
}
type Action = {
    type: 'update' | 'set';
    payload: any;
}
const reducer = (state=initialState, action: Action) => {
    switch(action.type) {
        case 'update': {
            return {
                ...state,
                [action.payload.property]: action.payload.value
            }
        }
        case 'set': {
            return action.payload;
        }
    }
}

const updateUserProperty: (property: string, value: any) => Action = (property, value) => ({
    type: 'update',
    payload: { property, value }
})
export const AboutPage = () => {
    const { t } = useTranslation('settings');
    const { user, updateUser } = useAuth();
    const { setChanges, hasChanges, close } = useChange();
    const [state, dispatch]: [typeof initialState, Dispatch<Action>] = useReducer(reducer, initialState);

    // Mounting user inputs
    useEffect(() => {
        if(!user) return;
        const { relationship, education, location } = user;
        const about = { relationship, education, location };
        dispatch({
            type: 'set',
            payload: about
        })
    }, [user]);
    
    const updateRelationShip = (status: string) => {
        const profileUser = user;
        dispatch(updateUserProperty('relationship', status));
    }

    const relationShipItems: DropdownItem[] = [
        { id: 'single', text: t('single'), onClick: () => updateRelationShip('single') },
        { id: 'inRelationship', text: t('inRelationship'), onClick: () => updateRelationShip('inRelationship') },
        { id: 'complicated', text: t('complicated'), onClick: () => updateRelationShip('complicated') }
    ];

    const onChange = () => {
        const newProfile = {...user, ...state};
        delete newProfile.avatar;
        delete newProfile.banner;
        updateProfile(newProfile).then(profile => {
            updateUser(profile);
        })
    }
    const onReset = () => {
        const { relationship, education, location } = user;
        const about = { relationship, education, location };
        dispatch({ type: 'set', payload: about });
        close();
    }
    // Making sure it doesn't open changes notice on mount
    if(user?.id) {
        let isSame = true;
        for(const key of Object.keys(state)) {
            if(state[key] === undefined) continue;
            if(state[key] !== user[key]) {
                isSame = false;
                break;
            }
        }
        if(isSame && hasChanges) {
            close();
        }
        if(!isSame) {
            setChanges(onChange, onReset);
        }
    }

    const { relationship, education, location } = state;
    return(
        <SettingsMain title={'About'}>
            <AboutInput 
                type={'location'}
                label={t('locationLabel')}
                onChange={value => dispatch(updateUserProperty('location', value))}
                defaultValue={location}
            />
            <AboutInput 
                type={'education'}
                label={t('educationLabel')}
                onChange={value => dispatch(updateUserProperty('education', value))}
                defaultValue={education}
            />
            <AboutInput 
                type={'relationship'}
                label={t('relationshipLabel')}
                inputType={'dropdown'}
                dropdownItems={relationShipItems}
                activeDropdownItem={relationship || relationShipItems[0].text}
            />
        </SettingsMain>
    )
}