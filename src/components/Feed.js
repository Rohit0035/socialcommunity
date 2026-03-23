import Post from "./Post";
import Stories from "./stories/Stories";

export default function Feed() {
  return (
    <>
      <Stories />
      {/* <ReelsList/> */}
      <div className="mb-2">
        {[1, 2, 3].map((p) => (
          <Post key={p} />
        ))}
      </div>
    </>
  );
}
