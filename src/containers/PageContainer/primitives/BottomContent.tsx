import styled from 'styled-components';

export default styled.div`
    position: absolute;
    bottom: 32px;
    left: 0;
    right: 0;

    nav li {
        margin: 0 32px;
        font-size: 2.4rem;

        a {
            text-decoration: none;
            color: white;
            padding-bottom: 16px;
            position: relative;
            opacity: 1;

            &:after {
                content: '';
                position: absolute;
                width: 100%;
                height: 4px;
                bottom: 0;
                left: 0;
                right: 0;
                background-color: white;
                transition: all .25s ease;
                transform: scale( 0 );
            }

            &:hover {
                &:after {
                    transform: scale( 1 );
                }
            }
        }
    }
`;