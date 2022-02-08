import React from 'react'
import Carousel from 'react-material-ui-carousel'
import StraightenIcon from '@mui/icons-material/Straighten';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import BungalowIcon from '@mui/icons-material/Bungalow';
import styled from 'styled-components'

function FullProfileCard({user, setPhotoDelete}) {

    const handlePhotoDelete = (e) => {
        fetch(`/photos/${e.target.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        })
        .then(resp => resp.json())
        .then((data) => {
            setPhotoDelete(true)
        })
    }
    
    return (
        <FullProfileCardStyle>
            <div className="profile-card">
                <Carousel 
                    autoPlay={false} 
                    id="carousel"
                    navButtonsProps={{style: {display: 'none'}}}
                    navButtonsWrapperProps={{style: {display: 'none'}}}
                >
                    {user.profile.photos.map((photo) => {
                        return <img src={photo.image} alt={user.name} />
                    })}
                </Carousel>
                <div className="profile-info">
                    <ul>
                        <li><StraightenIcon fontSize="small" color="primary"/> <span>{user.profile.size}</span></li>
                        <li><EmojiEmotionsIcon fontSize="small" color="primary"/> <span>{user.profile.personality}</span></li>
                        <li><BungalowIcon fontSize="small" color="primary"/> <span>{user.profile.location}</span></li>
                    </ul>
                    <h1>{user.name}, {user.profile.age}</h1>
                    <hr/>
                    <p className="bio">{user.profile.bio}</p>
                </div>
            </div>
        </FullProfileCardStyle>
    )
}

export default FullProfileCard

const FullProfileCardStyle = styled.div`

    margin-top: 2em;
    margin-bottom: 1em;
    

    .profile-card {
        border: 2px solid grey;
        border-radius: 1.1em;
        margin: auto;
        width: 50%;
        background-color: white;
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
        height: 50vw;
        object-fit: cover;
        border-radius: 1em 1em 0 0;
    }

    .match-alert {
        border: 1px solid grey;
        width: 60%;
        margin: auto;
        border-radius: 1em;
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
        margin-bottom: 1.5em;
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