import styles from '../styles/Button.module.scss';
import { LoadingDots } from './loading/LoadingDots';

interface Props {
    children: any;
    type?: 'primary' | 'secondary' | 'transparent';
    style?: any;
    className?: any;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
}

export const Button: React.FC<Props> = ({ children, type='primary', style, className, onClick, disabled, loading }) => {
    let typeStyle: any;
    switch(type) {
        case 'primary':
            typeStyle = styles['primary'];
            break;
        case 'secondary':
            typeStyle = styles['secondary'];
            break;
        case 'transparent':
            typeStyle = styles['transparent']
            break;
    }
    const newClassName = [className, styles['button'], typeStyle].join(' ');
    return(
        <div 
            className={newClassName} 
            style={{...style, ...{pointerEvents: disabled ? 'none' : 'all'}}} 
            onClick={onClick}
        >
            {loading ? (
                <LoadingDots />
            ) : children}
        </div>
    )
}