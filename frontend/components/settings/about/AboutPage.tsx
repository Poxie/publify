import { useTranslation } from 'next-i18next';
import React from 'react';
import { useReducer } from 'react';
import { useEffect } from 'react';
import { Dispatch } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../../contexts/AuthProvider';
import { useChange } from '../../../contexts/ChangeProvider';
import { setProfile } from '../../../redux/actions';
import { useAppSelector } from '../../../redux/hooks';
import { selectProfileUser } from '../../../redux/selectors';
import { createCustomAbout, updateCustomAbout, updateProfile } from '../../../utils';
import { DropdownItem } from '../../Dropdown';
import { SettingsMain } from '../SettingsMain';
import { AboutInput } from './AboutInput';
import { AddAboutItem } from './AddAboutItem';

const initialState = {
    relationship: undefined,
    education: undefined,
    location: undefined,
    customAbouts: undefined
} as {
    relationship: string;
    education: string;
    location: string;
    customAbouts: any[];
}
type Action = {
    type: 'update' | 'set' | 'updateCustom' | 'addCustom';
    payload?: any;
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
        case 'updateCustom': {
            const id = action.payload.id;

            const newCustomAbouts = state.customAbouts.map(about => {
                if(about.id === id) {
                    console.log(action.payload);
                    return action.payload;
                }
                return about;
            })
            return {
                ...state,
                customAbouts: newCustomAbouts
            }
        }
        case 'addCustom': {
            const newCustom = {
                type: 'custom',
                label: '',
                value: '',
                emoji: '2754'
            }
            return {
                ...state,
                customAbouts: [...state.customAbouts, ...[newCustom]]
            }
        }
    }
}

const updateUserProperty: (property: string, value: any) => Action = (property, value) => ({
    type: 'update',
    payload: { property, value }
})
export const AboutPage = () => {
    const { t } = useTranslation();
    const { user, updateUser } = useAuth();
    const { setChanges, hasChanges, close } = useChange();
    const [state, dispatch]: [typeof initialState, Dispatch<Action>] = useReducer(reducer, initialState);
    const storedUser = useAppSelector(state => selectProfileUser(state));
    const reduxDispatch = useDispatch();

    // Mounting user inputs
    useEffect(() => {
        if(!user) return;
        const { relationship, education, location, customAbouts } = user;
        const about = { relationship, education, location, customAbouts };
        dispatch({
            type: 'set',
            payload: about
        })
    }, [user]);
    
    const updateRelationShip = (status: string) => {
        dispatch(updateUserProperty('relationship', status));
    }

    const relationShipItems: DropdownItem[] = [
        { id: 'relationshipN/A', text: t('relationshipN/A'), onClick: () => updateRelationShip('relationshipN/A') },
        { id: 'single', text: t('single'), onClick: () => updateRelationShip('single') },
        { id: 'inRelationship', text: t('inRelationship'), onClick: () => updateRelationShip('inRelationship') },
        { id: 'complicated', text: t('complicated'), onClick: () => updateRelationShip('complicated') }
    ];

    const onChange = async () => {
        const newProfile = {...user, ...state};
        delete newProfile.avatar;
        delete newProfile.banner;

        // Makes sure it show sthe add item component
        newProfile.education = newProfile.education || null;
        newProfile.location = newProfile.location || null;

        updateProfile(newProfile).then(profile => {
            updateUser(profile);
            
            // If current saved profile is same
            if(profile.id === storedUser?.id) {
                reduxDispatch(setProfile(profile));
            }
        })

        // Updating custom abouts
        if(JSON.stringify(newProfile.customAbouts) !== JSON.stringify(user.customAbouts)) {
            for(let about of newProfile.customAbouts) {
                // If has no id, create new about
                if(!about.id) {
                    const newAbout = await createCustomAbout(about);
                    about = newAbout;
                } else {
                    // Else update about
                    updateCustomAbout(about);
                }
            }
        }
    }
    const onReset = () => {
        const { relationship, education, location, customAbouts } = user;
        const about = { relationship, education, location, customAbouts };
        dispatch({ type: 'set', payload: about });
        close();
    }
    // Making sure it doesn't open changes notice on mount
    if(user?.id) {
        let isSame = true;
        for(const key of Object.keys(state)) {
            if(state[key] === undefined) continue;
            if(JSON.stringify(state[key]) !== JSON.stringify(user[key])) {
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

    // Customized abouts
    const onCustomizedUpdate = async ({ id, label, value, emoji }) => {
        dispatch({
            type: 'updateCustom',
            payload: { id, label, value, emoji }
        })
    }
    const addCustomAbout = () => {
        dispatch({
            type: 'addCustom'
        })
    }

    const { relationship, education, location, customAbouts } = state;
    const hasLocation = user?.location !== null && user;
    const hasEducation = user?.education !== null && user;
    return(
        <SettingsMain title={'About'}>
            {hasLocation && (
                <AboutInput 
                    type={'location'}
                    label={t('locationLabel')}
                    onChange={value => dispatch(updateUserProperty('location', value))}
                    defaultValue={location}
                />
            )}
            {!hasLocation && (
                <AddAboutItem 
                    type={'location'}
                    onClick={() => {}}
                />
            )}
            {hasEducation && (
                <AboutInput 
                    type={'education'}
                    label={t('educationLabel')}
                    onChange={value => dispatch(updateUserProperty('education', value))}
                    defaultValue={education}
                />
            )}
            {!hasEducation && (
                <AddAboutItem 
                    type={'education'}
                    onClick={() => {}}
                />
            )}
            
            <AboutInput 
                type={'relationship'}
                label={t('relationshipLabel')}
                inputType={'dropdown'}
                dropdownItems={relationShipItems}
                activeDropdownItem={relationship || relationShipItems[0].text}
            />
            {customAbouts?.map(customAbout => {
                const { id, label, type, emoji, value } = customAbout;
                return(
                    <AboutInput 
                        label={label}
                        type={type}
                        defaultValue={value}
                        emoji={emoji}
                        isCustomizable={true}
                        customizedUpdate={onCustomizedUpdate}
                        id={id}
                    />
                )
            })}
            <AddAboutItem 
                onClick={addCustomAbout}
                type={'custom'}
            />
        </SettingsMain>
    )
}