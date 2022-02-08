import React, {useEffect, useState} from 'react'
import ProfileCard from './ProfileCard'
import CircularProgress from '@mui/material/CircularProgress';

function SwipeContainer({user}) {

    const [userStack, setUserStack] = useState('')

    useEffect(() => {
        fetch('/users')
        .then(resp => resp.json())
        .then(users => setUserStack(users))
    }, [user])

    const renderUserStack = () => {
        if (!userStack) {
            return <div style={{position: 'absolute', top: '50vh', left: '50vw'}}><CircularProgress color="primary" /></div>
        } else if (userStack.length === 0) {
            return <div 
                        style={
                            {
                                margin: 'auto',
                                marginTop: '6em',
                                backgroundColor: '#e68282',
                                width: '60%',
                                height: '10em',
                                lineHeight: '10em',
                                color: 'white',
                                fontWeight: '700',
                                borderRadius: '2em'
                            }
                        }
                    >
                        You've seen all users! Try updating your preferences for more.
                    </div>
        } else {
            return userStack.map((otherUser) => <ProfileCard key={user.id} user={user} otherUser={otherUser} />)
        }
    }
    
    return (
            <div className="user-stack">
                {renderUserStack()}
            </div>
    )
}

export default SwipeContainer