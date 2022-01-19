import react from 'react';
import { useReducer } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../contexts/AuthProvider';
import { useModal } from '../../contexts/ModalProvider';
import { createNotification } from '../../redux/actions';
import { createUser, login } from '../../utils';
import { ModalContent } from '../ModalContent';
import { ModalHeader } from '../ModalHeader';
import { RegisterDetailsContent } from './RegisterDetailsContent';
import { RegisterDetailsFooter } from './RegisterDetailsFooter';

type initialState = {
    username: string;
    password: string;
    avatar: null | File;
    banner: null | File;
    displayName: string;
    bio: string;
}
const getInitialState = (username: string, password: string) => {
    return {
        username,
        password,
        avatar: null,
        banner: null,
        displayName: '',
        bio: ''
    }
}
type Action = {
    type: keyof initialState;
    payload: string;
}
type Props = {
    username: string;
    password: string;
}
export const RegisterDetailModal: React.FC<Props> = ({ username, password }) => {
    const { close } = useModal();
    const { login } = useAuth();
    const reduxDispatch = useDispatch();
    const [state, dispatch] = useReducer((state: initialState, action: Action) => {
        switch(action.type) {
            default:
                return {
                    ...state,
                    [action.type]: action.payload
                }
        }
    }, getInitialState(username, password))

    // Updating property
    const updateProperty = (property: keyof initialState, value: string) => {
        dispatch({ type: property, payload: value });
    }

    // On user create
    const onCreate = async () => {
        const user = await createUser(state);
        // Notice: this doesn't update request object with access headers
        await login(state.username, state.password)
        close();
        reduxDispatch(createNotification('Successfully created user.', 'success'));
    }

    return(
        <div>
            <ModalHeader>
                Visibility Options
            </ModalHeader>
            <RegisterDetailsContent 
                updateProperty={updateProperty}
            />
            <RegisterDetailsFooter 
                onCreate={onCreate}
            />
        </div>
    )
}