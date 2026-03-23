import { ListGroup, ListGroupItem } from "reactstrap";

const friends = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
];

export default function FriendsList() {
  return (
    <div className="fb-friends-list">
      <h5>Your Friends</h5>

      <ListGroup>
        {friends.map((friend) => (
          <ListGroupItem key={friend.id}>
            {friend.name}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}