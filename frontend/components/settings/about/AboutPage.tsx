import { useTranslation } from 'next-i18next';
import React from 'react';
import { useReducer } from 'react';
import { useEffect } from 'react';
import { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../../contexts/AuthProvider';
import { useChange } from '../../../contexts/ChangeProvider';
import { setProfile } from '../../../redux/actions';
import { useAppSelector } from '../../../redux/hooks';
import { selectProfileUser } from '../../../redux/selectors';
import { createCustomAbout, destroyCustomAbout, updateCustomAbout, updateProfile } from '../../../utils';
import { DropdownItem } from '../../Dropdown';
import { SettingsMain } from '../SettingsMain';
import { AboutInput } from './AboutInput';
import { AddAboutItem } from './AddAboutItem';
import { CustomAbouts } from './CustomAbouts';

export type MapItem = {
    type: 'location' | 'education' | 'relationship' | 'custom';
    value: string;
    label: string;
    emoji?: string;
    id?: string;
    inputType?: 'dropdown' | 'input';
    dropdownItems?: DropdownItem[];
    activeDropdownItem?: string;
}

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
    type: 'update' | 'set' | 'updateCustom' | 'addCustom' | 'removeCustom';
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
                emoji: '2754',
                id: Math.random()
            }
            return {
                ...state,
                customAbouts: [...state.customAbouts, ...[newCustom]]
            }
        }
        case 'removeCustom': {
            const newCustoms = state.customAbouts.filter(custom => custom.id !== action.payload);
            return {
                ...state,
                customAbouts: newCustoms
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

    const onChange = async () => {
        let newCustomAbouts = [];
        for(let item of state.customAbouts) {
            const { value, label, emoji, id } = item;

            // If item has been created
            if(typeof item.id === 'number') {
                delete item.id;
                let createdAbout = await createCustomAbout(item);
                newCustomAbouts.push(createdAbout);
                continue;
            }

            // Getting previous item values
            let prevItem = user.customAbouts.find(item => item.id === id);
            const prevValues = { value: prevItem.value, label: prevItem.label, emoji: prevItem.emoji };

            // If item has been updated
            if(JSON.stringify({ value, label, emoji }) !== JSON.stringify(prevValues)) {
                await updateCustomAbout(item);
            }

            newCustomAbouts.push(item);
        }
        // Checking if item has been deleted
        for(const item of user.customAbouts) {
            if(!newCustomAbouts.map(i => i.id).includes(item.id)) {
                await destroyCustomAbout(item.id);
            }
        }

        // Checking for updates with static abouts
        let propsToUpdate = {};
        for(const key of Object.keys(state)) {
            if(key === 'customAbouts') continue;

            const value = state[key];
            const prevValue = user[key];
            if(value !== prevValue) {
                propsToUpdate[key] = value;
            }
        }

        // Creating new user object
        let newUser = {...user, ...propsToUpdate, ...{
            customAbouts: newCustomAbouts
        }};

        // If static abouts updated
        if(Object.keys(propsToUpdate).length) {
            let profileUser = {...newUser};

            // These are of type IDs here, update require type of Upload
            delete profileUser.avatar;
            delete profileUser.banner;

            // Updasting
            await updateProfile(profileUser);
        }

        // Updating view
        updateUser(newUser);

        // If current profile is stored in redux, update redux store
        if(newUser.id === storedUser?.id) {
            reduxDispatch(setProfile(newUser));
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
    const addItem = () => {
        dispatch({
            type: 'addCustom'
        })
    }
    const removeItem = (id: string) => {
        dispatch({
            type: 'removeCustom',
            payload: id
        })
    }
    const updateItem = (item: MapItem) => {
        dispatch({
            type: 'updateCustom',
            payload: item
        })
    }

    // Default about items
    const { location, education, relationship, customAbouts } = state;
    const items: MapItem[] = [
        { type: 'location', label: t('locationLabel'), value: location },
        { type: 'education', label: t('educationLabel'), value: education },
        { 
            type: 'relationship', 
            label: t('relationshipLabel'), 
            value: t(relationship), 
            inputType: 'dropdown', 
            dropdownItems: [
                { text: t('relationshipN/A'), id: 'relationshipN/A', onClick: () => dispatch(updateUserProperty('relationship', 'relationshipN/A')) },
                { text: t('single'), id: 'single', onClick: () => dispatch(updateUserProperty('relationship', 'single')) },
                { text: t('inRelationship'), id: 'inRelationship', onClick: () => dispatch(updateUserProperty('relationship', 'inRelationship')) },
                { text: t('complicated'), id: 'complicated', onClick: () => dispatch(updateUserProperty('relationship', 'complicated')) }
            ],
            activeDropdownItem: relationship
        }
    ]
    return(
        <SettingsMain title={'About'}>
            {items.map(item => {
                return(
                    <AboutInput 
                        {...item}
                        onChange={value => dispatch(updateUserProperty(item.type, value))}
                        key={item.type}
                    />
                )
            })}
            {customAbouts && customAbouts?.length !== 0 && (
                <CustomAbouts 
                    items={customAbouts}
                    removeItem={removeItem}
                    updateItem={updateItem}
                />
            )}
            <AddAboutItem 
                type={'custom'}
                onClick={addItem}
            />
        </SettingsMain>
    )
}