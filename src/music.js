import React, { Component, useEffect, useState } from "react";
import web3 from 'web3';

const Music = ({account, socialMusicInstance}) => {

    const [songName, setSongName] = useState('');
    const [songs, setSongs] = useState(null);

    const addMusic = async () => {
        await socialMusicInstance.methods.addSong(songName).send({from: account});
    }

    const handleChange = ({target: {value}}) => {
        setSongName(value);
    };

    useEffect(() => {
        const init = async () => {
            const songs = await socialMusicInstance.methods.getYourSongs(account).call();

            setSongs(songs || []);
        }

        init();
    }, []);

    return (
        <div className='d-flex flex-column align-items-center justify-content-center'>
             <div className='mt-4'>
                 {songs == null ? <span>Loading your songs...</span> : 
                    <div>
                        {songs.length === 0 && <span>You have no songs yet, add some!</span>}
                        {songs.length > 0 && 
                            <div>
                                <span>Your songs:</span>
                                <div className='d-flex flex-column mt-1'>
                                    {songs.map(song => <span className='text-bold' key={song}>{song}</span>)}
                                </div>
                            </div>
                        }
                    </div>
                 }
             </div>
             <input className='mt-4' type="text" onChange={handleChange} name="name" value={songName} placeholder="Your song name"></input>
             <button onClick={() => addMusic()}>Add song</button>
             <br/>
        </div>
  );
}

export default Music;
