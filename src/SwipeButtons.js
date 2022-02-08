import React from 'react'
import {styled} from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite';
import CancelIcon from '@mui/icons-material/Cancel';
import './styles/SwipeButtons.css'

function SwipeButtons({id, handleSwipe}) {

    const ColorButton = styled(IconButton)(({ theme }) => ({
        margin: '0.75em',
      }));

    return (
        <div>
            <ColorButton 
                type="button" 
                id={id} 
                variant="outlined"
                size="large"
                className="dislike-button" 
                onClick={(e) => handleSwipe(e, 'dislike-button')}
            >
                <CancelIcon />
            </ColorButton>
            <ColorButton 
                type="button" 
                id={id} 
                variant="contained"
                color="primary"
                size="large"
                className="like-button" 
                onClick={(e) => handleSwipe(e, 'like-button')}
            >
                <FavoriteIcon />
            </ColorButton>
        </div>
    )
}

export default SwipeButtons
