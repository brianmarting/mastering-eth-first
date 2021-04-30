import React, { Component, useEffect, useState } from "react";
import web3 from 'web3';

const Following = ({account, socialMusicInstance}) => {

    const [followingInput, setFollowingInput] = useState('');
    const [following, setFollowing] = useState(null);
    const [usersList, setUsersList] = useState(null);

    const followAddress = async () => {
        await socialMusicInstance.methods.follow(followingInput).send({from: account});
    }

    const handleChange = ({target: {value}}) => {
        setFollowingInput(value);
    };

    useEffect(() => {
        const init = async () => {
            const following = await socialMusicInstance.methods.getUsersYouFollow(account).call();
            const usersList = await socialMusicInstance.methods.getUsersList().call();

            const usersListFilteredByFollowing = (usersList || []).filter(user => {
                if (user === account) {
                    return false;
                }
                
                if (following?.length === 0) {
                    return true;
                }
            
                return !following.some(foll => foll === user);
            });

            setFollowing(following || []);
            setUsersList(usersListFilteredByFollowing || []);
        }

        init();
    }, []);

    return (
        <div className='d-flex flex-column align-items-center justify-content-center'>
             <div className='mt-4'>
                 
                 {following == null ? <span>Loading the ppl you are following...</span> : 
                    <div>
                        {following.length === 0 && <span>You are not following anyone yet!</span>}
                        {following.length > 0 && 
                            <div>
                                <span className='mb-1'>You are following these people: </span>
                                <div className='d-flex flex-column'>
                                    {following.map(user => <span key={user}>{user}</span>)}
                                </div>
                            </div>
                        }
                    </div>
                 }
             </div>
             <br/>
             <div className='mt-4'>
                 {usersList && usersList.length === 0 && <span>No new users have joined yet!</span>}
                 {usersList && usersList.length > 0 &&
                    <div>
                        <span>Newly joined people: </span>
                        {usersList.map(user => <span key={user}>{user}</span>)}

                        <div className='mt-3'>
                            <input type="text" onChange={handleChange} name="followingInput" value={followingInput} placeholder="Address of the person you want to follow"></input>
                            <button onClick={() => followAddress()}>Follow</button>
                        </div>
                    </div>
                 }
             </div>
        </div>
  );
}

export default Following;
