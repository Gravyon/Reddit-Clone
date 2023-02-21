import {ComponentStyleConfig} from '@chakra-ui/theme'

export const Button: ComponentStyleConfig = {
    baseStyle: {
        borderRadius: '60px',
        fontSize: '10pt',
        fontWeight: '700',
        _focues: {
            boxShadow: 'none'
        }
    },
    sizes: {
        sm: {
            fontSize: '8pt'
        },
        md: {
            fontSize: '10pt'
        },
    },
    variants: {
        solid: {
            color: 'white',
            bg: 'blue.500',
            _hover: {
                bg: 'blue.500'
            },
        },
        outline: {
            color: 'blue.500',
            border: "1px solid",
            borderColor: 'blue.500'
        },
        oauth: {
            height: '34px',
            border: '1px solid',
            borderColor: 'gray.300',
            _hover: {
                bg: 'gray.50'
            }
        },
        signup: {
            color: 'white',
            bg: '#FF5700',
            _hover: {
                bg: '#FF5700'
            },
        },
    }
}