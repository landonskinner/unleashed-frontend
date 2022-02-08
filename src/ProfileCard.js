import React, {useState, useEffect} from 'react'

import SwipeButtons from './SwipeButtons'
import IconButton from '@mui/material/IconButton'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Carousel from 'react-material-ui-carousel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StraightenIcon from '@mui/icons-material/Straighten';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import BungalowIcon from '@mui/icons-material/Bungalow';
import Backdrop from '@mui/material/Backdrop';

import { makeStyles } from "@mui/styles";
import styled from 'styled-components'

function ProfileCard({otherUser, user}) {
    
    const useStyles = makeStyles((theme) => ({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1
        }
    }))
    const classes = useStyles()

    const [swiped, setSwiped] = useState(false)
    const [matched, setMatched] = useState(false)
    const [distance, setDistance] = useState('')

    //  calculate distance between each user pair with coordinates
    useEffect(() => {
            const rad_per_deg = Math.PI/180
            const rm = 3963
            const lat_rad = user.profile.lat * rad_per_deg
            const dlat = (otherUser.profile.lat - user.profile.lat) * rad_per_deg
            const dlng = (otherUser.profile.lng - user.profile.lng) * rad_per_deg
            const lat_rad_1 = otherUser.profile.lat * rad_per_deg
            const a = Math.sin(dlat/2)**2 + Math.cos(lat_rad) * Math.cos(lat_rad_1) * Math.sin(dlng/2)**2
            const d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
            setDistance(Math.round(rm * d))
    }, [])

    const handleSwipe = (e, button) => {

        // create object to post based on user like/dislike
        const likeObj = () => {
            if (button === 'dislike-button') {
                return {
                    liker_id: user.id,
                    liked_id: otherUser.id,
                    matched: false
                }
            } else if (button === 'like-button') {
                return {
                    liker_id: user.id,
                    liked_id: otherUser.id,
                    matched: true
                }
            }
        }

        // pass object to likes table
        fetch('/likes', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(likeObj())
        })
        .then(resp => resp.json())
        .then(like => {
            // if the user liked, check to see if there is a match
            if (like.matched === true) {
                fetch('/matched', {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        liker_id: like.liker.id,
                        liked_id: like.liked.id
                    })
                })
                .then(resp => resp.json())
                .then(match => {
                    if (match.id) {
                        setMatched(true)
                    }
                })
            }
            setSwiped(true)
        })
    }

    const handleClose = () => {
        setMatched(false)
    }

    return (
        <ProfileCardStyle className="full-card">
            {matched ?
                <Backdrop onClick={handleClose} open={matched} className={classes.backdrop}>
                    <div className="match-alert">
                        <h3>{`You have matched with ${otherUser.name}!`}</h3>
                        <IconButton color="primary"><CheckCircleIcon/></IconButton>
                    </div>
                </Backdrop>
                :
                <div className="profile-card" style={swiped ? {display:'none'} : {display: ''}}>
                    <Carousel 
                        autoPlay={false} 
                        id="carousel"
                        navButtonsProps={{style: {display: 'none'}}}
                        navButtonsWrapperProps={{style: {display: 'none'}}}
                    >
                        {otherUser.profile.photos.map((photo) => {
                            return <img src={photo.image} alt={otherUser.name}/>
                        })}
                    </Carousel>
                    <div className="profile-info">
                        <ul>
                            <li><StraightenIcon fontSize="small" color="primary"/> <span>{otherUser.profile.size}</span></li>
                            <li><EmojiEmotionsIcon fontSize="small" color="primary"/> <span>{otherUser.profile.personality}</span></li>
                            <li><BungalowIcon fontSize="small" color="primary"/> <span>{otherUser.profile.location}</span></li>
                        </ul>
                        <h1>{otherUser.name}, {otherUser.profile.age}</h1>
                        <p className="location"><LocationOnIcon fontSize="small" color="primary"/>{distance} miles away</p>
                        <hr/>
                        <p className="bio">{otherUser.profile.bio}</p>
                    </div>
                    <SwipeButtons id={otherUser.id} handleSwipe={handleSwipe}/>
                </div>
            }
        </ProfileCardStyle>
        
    )
}

export default ProfileCard

const ProfileCardStyle = styled.div`
    .profile-card {
        border: 2px solid grey;
        border-radius: 1.1em;
        margin: auto;
        margin-bottom: 2em;
        width: 40%;
    }

    .profile-info {
        text-align: left;
        width: 85%;
        margin: auto;
    }

    .location {
        margin-top: 0.25em;
    }

    svg {
        vertical-align: middle;
    }

    hr {
        margin-top: 1em;
        margin-bottom: 1em;
        border-top: 1px solid grey;
    }

    .bio {
        margin-bottom: 1em;
    }

    img {
        flex-shrink: 0;
        width: 100%;
        height: 40vw;
        object-fit: cover;
        border-radius: 1em 1em 0 0 !important;
    }

    .match-alert {
        border: 1px solid grey;
        width: 30%;
        margin: auto;
        border-radius: 1em;
        background-color: white;
    }

    .match-alert h3 {
        margin: 0.5em;
        margin-bottom: 0.25em;
    }

    .match-alert button {
        margin-bottom: 0.1em;
    }

    h1 {
        color: black;
    }

    ul {
        list-style: none;
        float: right;
    }

    li {
        margin-bottom: 0.25em;
    }

    span {
        margin-left: 0.3em;
    }
`
