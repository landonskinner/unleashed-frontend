import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import styled from 'styled-components'


function ProfileForm({user, type, setUser, setEditClick, getLocation}) {

    const [photo, setPhoto] = useState("")
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        "user_id": user.id,
        bio: "",
        age: "",
        size: "",
        location: "",
        personality: ""
    })

    // populate edit form with existing profile data
    useEffect(() => {
        if (type === "edit") {
            fetch(`/profiles/${user.id}`)
                .then(resp => resp.json())
                .then(setFormData)
            }
    }, [])

    const sizeOptions = ['Tiny', 'Small', 'Medium', 'Large', 'Huge']
    const personalityOptions = ['Timid', 'Lazy', 'Calm', 'Outgoing', 'Indpendent']

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData)
    };
    
    const handleProfile = (e) => {
        e.preventDefault()
        if (user.profile === null) {
            fetch('/profiles', {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
              })
              .then(r => {
                if (r.ok) {
                  r.json().then((profile) => {
                      getLocation(user.id)
                      if (photo !== "") {
                        fetch('/photos', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                "profile_id": profile.id,
                                'image': photo
                            })
                        })
                        .then(resp => resp.json())
                        .then(() => {
                            setPhoto("")
                            fetch(`/users/${user.id}`)
                            .then(resp => resp.json())
                            .then(setUser)
                        })
                    } else {
                        fetch('/photos', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                "profile_id": profile.id,
                                'image': 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/65761296352685.5eac4787a4720.jpg'
                            })
                        })
                        .then(resp => resp.json())
                        .then(() => {
                            setPhoto("")
                            fetch(`/users/${user.id}`)
                            .then(resp => resp.json())
                            .then(setUser)
                        })
                    }
                    })
                } else {
                  r.json().then((err) => setErrors(err.errors))
                }
              })
        } else {
            fetch(`/profiles/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(resp => resp.json())
            .then(profile => {
                if (photo !== "") {
                    fetch('/photos', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "profile_id": profile.id,
                            'image': photo
                        })
                    })
                    .then(resp => resp.json())
                    .then(() => {
                        setPhoto("")
                        if (type === "edit") {
                            setEditClick(false)
                        }
                        fetch(`/users/${user.id}`)
                        .then(resp => resp.json())
                        .then(setUser)
                    })
                } else {
                    if (type === "edit") {
                        setEditClick(false)
                    }
                        fetch(`/users/${user.id}`)
                        .then(resp => resp.json())
                        .then(setUser)
                }
                
            })
        }

        
        
    }

  return (
      <>
    {type === "edit" ?
    null
    :
    <div className="header-parent">
        <div className="app-header-login">unLeashed</div>
    </div>
    }
    <ProfileFormStyle>
        <div className="profile-edit">
            <Paper elevation={4} variant="outlined">
                {type === "edit" ?  
                <IconButton type="button" className="cancel-button" size="large">
                    <CancelIcon onClick={() => setEditClick(false)}/>
                </IconButton>
                : 
                <div className="location-alert">Please enable location access for full app functionality!</div>
                }
                <form onSubmit={(e) => handleProfile(e)}>
                <TextField 
                    required
                    label="Bio"
                    multiline
                    name="bio"
                    autoComplete="off"
                    value={formData.bio}
                    onChange={(e) => handleChange(e)}
                    margin="normal"
                    fullWidth
                />
                <div className="form-separator">
                <TextField
                    required
                    label="Age"
                    type="number"
                    name="age"
                    min="0"
                    max="20"
                    value={formData.age}
                    onChange={(e) => handleChange(e)}
                    margin="normal"
                    inputProps={{
                        style: {
                            width: '2em',
                            // textAlign: 'center'
                        }
                    }}
                    fullWidth={type !== "edit"}
                    />
                <TextField
                    select
                    required
                    label="Size"
                    name="size" 
                    id="size" 
                    value={formData.size} 
                    onChange={(e) => handleChange(e)}
                    margin="normal"
                    fullWidth={type !== "edit"}
                >
                    {sizeOptions.map((size) => {
                        return (
                            <MenuItem key={size} value={size}>
                            {size}
                            </MenuItem>
                        )
                    })}
                </TextField>
                <TextField
                    required
                    select
                    label="Personality"
                    type="text"
                    name="personality"
                    value={formData.personality}
                    onChange={(e) => handleChange(e)}
                    margin="normal"
                    fullWidth={type !== "edit"}
                >
                    {personalityOptions.map((size) => {
                        return (
                            <MenuItem key={size} value={size}>
                            {size}
                            </MenuItem>
                        )
                    })}
                </TextField>
                
                <TextField 
                    required
                    label="City"
                    type="text"
                    name="location"
                    autoComplete="off"
                    value={formData.location}
                    onChange={(e) => handleChange(e)}
                    margin="normal"
                    inputProps={{
                        style: {
                            width: '55%'
                        }
                    }}
                    fullWidth={type !== "edit"}
                />
                </div>
                <TextField
                    label="Photo"
                    type="text"
                    name="photo"
                    placeholder="Upload a photo link..."
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    margin="normal"
                    fullWidth
                />
                {errors.map((err) => (
                    <Alert severity="error" key={err}>{err}</Alert>
                ))}
                <div className="button-holder">
                <Button type="submit" variant="contained" color="primary">
                    {type === "edit" ? "Edit Profile" : "Create Profile"}
                </Button>
                </div>
                </form>
            </Paper>
        </div>
    </ProfileFormStyle>
    </>
  );
}

export default ProfileForm;

const ProfileFormStyle = styled.div`

    position: relative;
    top: 3.5em;


  form {
    margin: auto;
    width: 80%;
    margin-bottom: 1em;
    margin-top: 2.5em;
  }

  .form-separator {
    display: flex;
    justify-content: space-between;
  }

  .profile-edit:first-child {
    margin: auto;
    width: 60%;
  }

  .cancel-button {
    float: right;
    margin: 0.15em;
  }

  button[type="submit"] {
    margin: 1em; 
  }

  .button-holder {
    text-align: center;
  }

  .location-alert {
    display: inline-block;
    position: relative;
    top: 1.75em;
    margin: auto;
    width: 100%;
    text-align: center;
    font-family: Roboto;
    color: #7b7b7b;
  }

`
