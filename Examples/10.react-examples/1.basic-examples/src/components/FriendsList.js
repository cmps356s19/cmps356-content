import React, {useState} from "react";
import FriendForm from "./FriendForm";

export default function FriendsList() {
    const [friends, setFriends] = useState(['Fatima', 'Mouza', 'Sarah']);

    const handleAddFriend = name => {
        //friends.push(name);
        //console.log(friends);
        //Clone the friends then add the new one
        const newFriends = [...friends, name];
        setFriends(newFriends);
    };


    return <>
            <FriendForm onAddFriend={handleAddFriend} />
            <ul>
                {friends.map((friend, i) =>
                    <li key={i}>{friend}</li>
                )}
            </ul>
          </>
}