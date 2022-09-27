import { styled } from '..';
export const SuccessContainer = styled('main', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    margin: '0 auto',
    height: 656,

    h1: {
        fontSize: '$2xl',
        color: '$gray100',
    },

    p:{
        fontSize: '$xl',
        color: '$gray300',
        maxWidth: 560,  //para centralizar o texto
        textAlign: 'center',
        lineHeight: 1.4, //para espaçar as linhas
    },
   
    a:{
        display: 'block',
        marginTop: '5rem',

        fontWeight: 'bold',
        fontSize: '$lg',
        color: '$green500',
        textDecoration: 'none',  //tira o sublinhado do link

        '&:hover':{
            color: '$green300',
        }
    }
})
export const ImageContainer = styled('div', {

    background: 'linear-gradient(180deg , #1ea483 0%, #7465d4 100%)',

    width: '100%',
    maxWidth: 130,
    height: 145,

    borderRadius: 8,
    padding: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: '4rem',
    marginBottom: '2rem',

    img: {
        objectFit: 'cover',
    }
})