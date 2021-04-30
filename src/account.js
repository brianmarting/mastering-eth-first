import React, { Component, useEffect, useState } from "react";
import web3 from 'web3';

const Account = ({account, socialMusicInstance}) => {
   
    const [hasAcc, setHasAcc] = useState(null);
    const [values, setValues] = useState({age: 12, name: 'grand', description: 'ttees'});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            const hasAcc = await socialMusicInstance.methods.hasAccount(account).call();

            setHasAcc(hasAcc);
            setLoading(false);
        }

        init();
    }, []);

    const handleChange = (event) => {
        const { target } = event;
        const { name, value } = target;
        event.persist();
        setValues({ ...values, [name]: value });
    };

    const submitForm = async () => {
        const {name, age, description} = values;

        await socialMusicInstance.methods.setup(name, age, description).send({from: account});
    }

    return (
        <div className='d-flex align-items-center justify-content-center'>
            {isLoading && <div>Loading...</div>}

            {!isLoading && !hasAcc&&
                <div className='d-flex flex-column'>
                    <span>Setup your account</span>
                    <div className='d-flex flex-row mt-2'>
                        <input type="text" onChange={handleChange} name="name" value={values.name} placeholder="Your name"></input>
                        <input type="number" onChange={handleChange} name="age" value={values.age} placeholder="Your age"></input>
                        <textarea onChange={handleChange} name="description" value={values.description} placeholder="Description of yourself"></textarea>
                        <button onClick={() => submitForm()}>Save</button>
                    </div>
                </div>
            }

            {!isLoading && hasAcc && 
                <>
                    <span>You already have an account!</span>
                </>
            }
        </div>
  );
}

export default Account;
