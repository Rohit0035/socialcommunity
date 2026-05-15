import ProfileHero from "@/components/profile/ProfileHero";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { Container, Row, Col } from "reactstrap";

export default function ProfileIndex () {
  return (
    <>
       <ProfileHero/>
       <ProfileTabs/>
    </>
  );
}