export const customComponents = {
    MuiButton: {
        styleOverrides: {
            root: {
                padding: '14px 40px',
                borderRadius: 8,
                boxShadow: '0 6px 13px 3px #0E0E2C18',
            },
        },
    },
    MuiSvgIcon: {
        styleOverrides: {
            root: {
                '> *': {
                    fill: '#FFFFFF'
                }
            },

        }, 
    },
    // TODO: Input Field
    MuiInputBase: {
        styleOverrides: {
            root: {
                borderRadius: 16,
                border: '1px solid #FFFFFF'
            },

        }, 
    },
    MuiOutlinedInput: {
        styleOverrides: {
            root: {
                borderRadius: 16,
            },
        }, 
    },
    MuiSelect: {
        styleOverrides: {
            root: {
                borderRadius: 16,
            },
            select: {
                borderRadius: 16,
            }
        }, 
    },
    MuiMenu: {
        styleOverrides: {
            paper: {
                borderRadius: 16,
                border: '1px solid #FFFFFF',
                marginTop: 8,
                marginBottom: 8
            },
        }, 
    },
    MuiMenuItem: {
        styleOverrides: {
            root: {
                '&:hover': {
                    backgroundColor: 'rgba(140, 140, 161, 0.12)'
                }
            },
        }, 
    },
    MuiAlert: {
        styleOverrides: {
            root: {
                borderRadius: 8,
                '&.MuiAlert-colorSuccess': {
                    color: '#FFFFFF'
                }
            },
        },
    },
    MuiDialog: {
        styleOverrides: {
            paper: {
                borderRadius: 8,
            },
        }, 
    },
    MuiBackdrop: {
        styleOverrides: {
            root: {
                backdropFilter: 'blur(4px)'
            },
        }, 
    },
}