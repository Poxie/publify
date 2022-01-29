import React from 'react';

export const HomeLayout: React.FC = ({ children }) => {
    return(
        <div style={styles}>
            {children}
        </div>
    )
}

const styles = {
    width: 600,
    margin: '0 auto',
    paddingTop: 'var(--spacing)'
}