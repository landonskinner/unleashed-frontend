import React, {useEffect, useState} from 'react'
import MinProfileCard from './MinProfileCard'
import {ChatEngine, ChatList} from  'react-chat-engine';
import ChatFeed from './components/ChatFeed';
import CircularProgress from '@mui/material/CircularProgress';
import Button from "@mui/material/Button";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import styled from 'styled-components'

function Matches({user}) {

    const [matches, setMatches] = useState([])
    const [showMatches, setShowMatches] = useState(false)
    
    useEffect(() => {
        fetch(`/own_matches/${user.id}`)
        .then(resp => resp.json())
        .then(setMatches)
    }, [user])

    const displayMatches = () => {
        if (matches.length !== 0) {
            return matches.map(match => <MinProfileCard key={match.id} match={match} user={user} />)
        } else {
            return null
        }
    }

    if (!sessionStorage.getItem('username')) return <CircularProgress color="primary" />

    return (
        <MatchesStyle>
            {showMatches ?
                <div className="matches-display">
                    <Button variant="outlined" className="matches-button" onClick={() => setShowMatches(false)}><ArrowDropUpIcon color="primary"/>Matches</Button>
                    <div className="match-list">
                        {displayMatches()}
                    </div>
                </div>
                :
                <Button variant="contained" className="matches-button" onClick={() => setShowMatches(true)}><ArrowDropDownIcon />Matches</Button>
            }
            <ChatEngine 
                height="80vh"
                projectID="bdccd118-daa8-45d2-b72f-297005ad398a"
                userName={sessionStorage.getItem('username')}
                userSecret={sessionStorage.getItem('password')}
                renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
                renderChatList={(chatAppProps) => <ChatList {...chatAppProps} />}
            />
        </MatchesStyle>
    )
}

export default Matches

const MatchesStyle = styled.div`

    .matches-button {
        margin-bottom: 2em;
    }

    .matches-display {
        z-index: 0;
    }

    .match-list {
        display: inline-block;
        width: auto;
        max-width: 90%;
        margin: auto;
        margin-bottom: 0.5em;
        border-radius: 2em;
        background-color: rgb(240, 240, 240);
        border: 2px solid grey;
    }

`