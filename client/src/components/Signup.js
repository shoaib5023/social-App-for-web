import React, { useState } from 'react'
import '../App.css'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'

const Signup = () => {

    const history = useHistory()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")


    const PostData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            return M.toast({ html: "Invalid Email", classes: "#ef9a9a red lighten-1" })
        }
        console.log("data loading...")
        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email,
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#ef9a9a red lighten-1" })
                    // console.log(data)
                }
                else {
                    // console.log(data)
                    M.toast({ html: data.message, classes: "#1b5e20 green darken-4" })
                    history.push("/login")

                }
            }).catch(err => {
                console.log(err)
            })

    }


    return (
        <div className="mycard">
            <div className="card auth-card input-field ">
                <h2>Instagram</h2>
                <input
                    className=' white lighten-5'
                    type='text'
                    placeholder='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                <input
                    className=' white lighten-5'
                    type='text'
                    placeholder='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <input
                    className=' white lighten-5'
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <button className="btn #ef9a9a red lighten-1" onClick={PostData} >
                    Signup
               </button>
                <br></br>
                <h5>
                    <Link to='/login'>Already have an Account ? </Link>
                </h5>

            </div>
        </div>
    )
}

export default Signup
