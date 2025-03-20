import React, { useContext } from 'react'
import { Context } from '../context/StoreContext'

const SideNav = ({ className }) => {

    const { allUser, deleteUser } = useContext(Context);
    return (
        <div className={`${className}`}>
            <h1>All User </h1>
            {allUser.map((item, index) => {
                return (<div style={{ marginTop: '10px', border: '1px solid green' }} key={index}>
                    <p>{item.name}</p>
                    <p>{item.email}</p>
                    {item.image && <img src={`http://localhost:4003/uploads/${item.image}`} alt={item.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />}

                    <button onClick={() => deleteUser(item._id)}>Delete</button>
                </div>
                )
            })}

        </div>
    )
}

export default SideNav