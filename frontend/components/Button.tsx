import styles from '../styles/Button.module.scss';

interface Props {
    children: any;
    type?: 'primary' | 'secondary';
    style?: any;
    className?: any;
    onClick?: () => void;
}

export const Button: React.FC<Props> = ({ children, type='primary', style, className, onClick }) => {
    const newClassName = [className, styles['button'], type === 'primary' ? styles['primary'] : styles['secondary']].join(' ');
    return(
        <div className={newClassName} style={style} onClick={onClick}>
            {children}
        </div>
    )
}