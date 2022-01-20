import React, { useRef } from 'react';
import styles from '../../styles/RegisterModal.module.scss';
import { useState } from 'react';
import { ModalContent } from '../ModalContent';
import { Input } from '../../components/Input';
import { Flex } from '../../components/Flex';
import { Avatar } from '../../components/Avatar';
import { useTranslation } from 'next-i18next';

type Props = {
    updateProperty: (property: 'avatar' | 'banner' | 'displayName' | 'bio', value: string | File) => void;
}
export const RegisterDetailsContent: React.FC<Props> = ({ updateProperty }) => {
    const { t } = useTranslation();
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState('');
    const [banner, setBanner] = useState(null);
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const bannerInputRef = useRef<HTMLInputElement>(null);

    const openAvatarMenu = () => {
        avatarInputRef.current?.click();
    }
    const openBannerMenu = () => {
        bannerInputRef.current?.click();
    }
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];
        updateProperty('avatar', file);
        const source = URL.createObjectURL(file);
        setAvatar(source);
    }
    const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];
        updateProperty('banner', file);
        const source = URL.createObjectURL(file);
        setBanner(source);
    }
    const inputUpdate = (property: 'displayName' | 'bio', value: string) => {
        if(property === 'displayName') {
            setDisplayName(value);
        } else {
            setBio(value);
        }
        updateProperty(property, value);
    }

    return(
        <ModalContent className={styles['modal-content']}>
            <Flex>
                <div className={styles['input']}>
                    <span className={styles['input-header']}>
                        Avatar
                    </span>
                    <Avatar 
                        avatar={avatar}
                        name={'avatar'}
                        className={styles['avatar']}
                        size={75}
                        onAvatarClick={openAvatarMenu}
                    />
                </div>
                <div className={styles['input']} style={{flex: 1}}>
                    <span className={styles['input-header']}>
                        Banner
                    </span>
                    <div 
                        style={{backgroundImage: `url(${banner})`}}
                        className={styles['banner']}
                        onClick={openBannerMenu}
                    />
                </div>
            </Flex>

            <Input 
                label={t('displayName')}
                placeholder={`${t('displayName')}...`}
                type={'secondary'}
                onChange={value => inputUpdate('displayName', value)}
            />
            <Input 
                label={t('aboutMe')}
                placeholder={`${t('aboutMe')}...`}
                type={'secondary'}
                textArea={true}
                onChange={value => inputUpdate('bio', value)}
            />

            <input onChange={handleAvatarChange} type="file" ref={avatarInputRef} style={{display: 'none'}} />
            <input onChange={handleBannerChange} type="file" ref={bannerInputRef} style={{display: 'none'}} />
        </ModalContent>
    )
}