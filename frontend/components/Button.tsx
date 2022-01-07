import styles from '../styles/Button.module.scss';

interface Props {
    children: any;
    type?: 'primary' | 'secondary' | 'transparent';
    style?: any;
    className?: any;
    onClick?: () => void;
}

export const Button: React.FC<Props> = ({ children, type='primary', style, className, onClick }) => {
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
        <div className={newClassName} style={style} onClick={onClick}>
            {children}
        </div>
    )
}