import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../contexts/AuthProvider';
import { useChange } from '../../../contexts/ChangeProvider';
import styles from '../../../styles/Settings.module.scss';
import { updateProfile } from '../../../utils';
import { UserType } from '../../../utils/types';
import { Input } from '../../Input';
import { UserProfile } from '../../UserProfile';
import { ProfilePreview } from './ProfilePreview';

export const ProfileEditor = () => {
    const { user, updateUser } = useAuth();
    const { setChanges, hasChanges, close } = useChange();
    const [currentProfile, setCurrentProfile] = useState(user);
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const bannerInputRef = useRef<HTMLInputElement>(null);
    const currentFiles = useRef({avatar: null, banner: null});

    // If user change, update current profile
    useEffect(() => {
        setCurrentProfile(user);
    }, [user]);

    // On changes saved
    const onChange = async () => {
        // Creating copy so we don't mutate object
        let properties = {...currentProfile};

        // We'll have a special case for these
        delete properties.banner;
        delete properties.avatar;

        // Handling file uploads
        for(const imageType of ['avatar', 'banner']) {
            const file = currentFiles.current[imageType];
            if(file) {
                properties[imageType] = file;
            }
        }

        // Sending update request
        const user = await updateProfile(properties);
        updateUser(user);
    }
    // On changes reset
    const onReset = () => {
        setCurrentProfile(user);
    }

    // Updating profile property
    const updateProperty = (property: keyof UserType, value: any) => {
        setCurrentProfile(previous => ({...previous, ...{[property]: value}}));
    };

    // Handling image property changes (avatar, banner)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'banner') => {
        const file = e.target.files[0];
        currentFiles.current = {...currentFiles.current, ...{[type]: file}};
        const source = URL.createObjectURL(file);
        updateProperty(type, source);
    };

    // Making sure it doesn't open notice on mount
    if(currentProfile?.id) {
        // If currentProfile and user have same properties, close changes notice
        if(JSON.stringify(currentProfile) === JSON.stringify(user) && hasChanges) {
            close();
        }
        // If they are not the same, open changes notice
        if(JSON.stringify(currentProfile) !== JSON.stringify(user)) {
            setChanges(onChange, onReset);
        }
    }

    return(
        <div className={styles['profile-settings']}>
            <ProfilePreview 
                {...currentProfile}
                onAvatarClick={() => avatarInputRef.current?.click()}
                onBannerClick={() => bannerInputRef.current?.click()}
            />
            <input type="file" ref={avatarInputRef} onChange={e => handleFileChange(e, 'avatar')} />
            <input type="file" ref={bannerInputRef} onChange={e => handleFileChange(e, 'banner')} />
            
            <Input 
                label={'Display Name'}
                onChange={value => updateProperty('displayName', value)}
                defaultValue={currentProfile?.displayName}
            />
            <Input 
                label={'Bio'}
                onChange={value => updateProperty('bio', value)}
                defaultValue={currentProfile?.bio}
                textArea={true}
            />
        </div>
    )
}