import { ListGroup, ListGroupItem } from "reactstrap";
import { FaUserFriends, FaUserPlus } from "react-icons/fa";

export default function FriendsSidebar({ setActiveTab }) {
  return (
    <div className="fb-sidebar-wrapper">
      <h4 className="fb-sidebar-title">Friends</h4>

      <ListGroup flush>
        <ListGroupItem
          className="fb-sidebar-item"
          onClick={() => setActiveTab("requests")}
        >
          <FaUserPlus className="me-2" />
          Friend requests
        </ListGroupItem>

        <ListGroupItem
          className="fb-sidebar-item"
          onClick={() => setActiveTab("suggestions")}
        >
          <FaUserFriends className="me-2" />
          Suggestions
        </ListGroupItem>

        <ListGroupItem
          className="fb-sidebar-item"
          onClick={() => setActiveTab("friends")}
        >
          <FaUserFriends className="me-2" />
          Your friends
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}