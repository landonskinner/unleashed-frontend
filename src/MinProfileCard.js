import {useState, useEffect, useContext} from 'react'
import { ChatEngineContext, newChat, addPerson } from 'react-chat-engine';
import FullProfileCard from './FullProfileCard'
import Backdrop from '@mui/material/Backdrop'
import IconButton from '@mui/material/IconButton'
import CancelIcon from '@mui/icons-material/Cancel';
import ChatIcon from '@mui/icons-material/Chat';
import { makeStyles } from "@mui/styles";
import styled from 'styled-components'

function MinProfileCard({match, user}) {

    const useStyles = makeStyles((theme) => ({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            display: 'flex',
            flexDirection: 'column'
        }
    }))
    const classes = useStyles()

    const [matchProfile, setMatchProfile] = useState('')
    const [expandProfile, setExpandProfile] = useState(false)

    useEffect(() => {
        if (match.matcher.liker.id !== user.id) {
            setMatchProfile(match.matcher.liker)
        } else {
            setMatchProfile(match.matcher.liked)
        }
    }, [user])

    const { connecting, conn } = useContext(ChatEngineContext)

    const createChat = () => {
        if (!connecting && conn) {
            newChat(
              conn,
              { title: `${matchProfile.name} & ${user.name}`},
              (chat) => {
                addPerson(
                  conn,
                  chat.id,
                  matchProfile.email,
                  () => {
                    addPerson(
                      conn,
                      chat.id,
                      user.email,
                      () => {console.log('done')}
                    )
                  }
                )
              }
            )
        setExpandProfile(false)
        }
    }

    if (!matchProfile) return ""

    return (
        <MinProfileCardStyle>
        {expandProfile ? 
            <Backdrop open={expandProfile} className={classes.backdrop}>
                <FullProfileCard user={matchProfile} />
                <div className="button-container">
                <IconButton 
                    type="button" 
                    size="large" 
                    variant="outlined"
                    color="primary"
                    onClick={() => createChat()}
                >
                    <ChatIcon />
                </IconButton>
                <IconButton 
                    type="button" 
                    size="large" 
                    onClick={() => setExpandProfile(false)}
                >
                    <CancelIcon />
                </IconButton>
                </div>
            </Backdrop>
            :
            <div className="min-card" onClick={() => setExpandProfile(true)}>
                <img className="min-photo" src={matchProfile.profile.photos[0].image} alt={matchProfile.name} />
                <div className="min-name">{matchProfile.name}</div>
            </div>
        }
        </MinProfileCardStyle>
    )
}

export default MinProfileCard

const MinProfileCardStyle = styled.div`
    
    display: inline;
    
    .min-photo {
        width: 100%;
        border-radius: 0.85em 0.85em 0 0;
    }

    .min-name {
        position: relative;
        bottom: 0.1em;
        padding: 0.2em;
        color: white;
        font-weight: 700;
        border-radius: 20px 20px 0 0;
    }

    .min-card {
        display: inline-block;
        border: 2px solid #7b7b7b;
        margin: 1em;
        border-radius: 1em;
        width: 25%;
        cursor: pointer;
        background-color:#e68282;
        
    }

    .button-container {
        padding: 5px;
        background-color: white;
        border-radius: 50px;
    }

`