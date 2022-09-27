import { styled } from "@stitches/react";

export const ProductContainer = styled('main',{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'stretch',  //2 colunas ocupem mesmo espaço verticalmente
    gap: '4rem',

    maxWidth: '1180px',
    margin: '0 auto',
})
export const ImageContainer = styled('div',{
    width: '100%',
    maxWidth: 576,
    background: 'linear-gradient(180deg , #1ea483 0%, #7465d4 100%)',
    height: 656,

    borderRadius: 8,
    padding: '0.25rem',
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'center',

    img: {
        objectFit: 'cover',
    }

})
export const ProductDetails = styled('div', {
    display: 'flex',
    flexDirection: 'column',

    h1: {
        fontSize: '$2xl',
        color: '$gray300',

    },

    span: {
        marginTop: '1rem',
        display: 'block',
        fontSize: '$2xl',
        color: '$green300',
    },
    
    p: {
        marginTop: '2.5rem',
        fontSize: '$md',
        lineHeight: 1.6,
        color: '$gray300',
    },

    button: {
        marginTop: 'auto',  //joga o botão pra baixo
        background: '$green500',
        border: 0,

        color: "$white",
        borderRadius: 8,
        padding: '1.25rem',

        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '$lg',

        transition: 'filter 0.2s',

        '&:disabled': {
            opacity: 0.6,
            cursor: 'not-allowed',
        },
        
        '&:not(:disabled):hover': {
            background: '$green300',
        }
    }
})