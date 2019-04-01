import React from "react";

export default function FriendsList({friends}) {
  return <ul>
            {friends.map( (friend, i) =>
                <li key={i}>{friend}</li>
            )}
         </ul>
}