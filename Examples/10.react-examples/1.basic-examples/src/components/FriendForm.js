import React, {useState} from 'react';

export default function FriendForm(props) {
    const [name, setName] = useState('');

    const handleAddFriend = () => {
        props.onAddFriend(name);
        setName('');
    }

    return (
        <div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            <button onClick={handleAddFriend}> Add Friend</button>
        </div>
    )
}