import Image from "next/image";

const StoryRing = ({
  avatar,
  storyCount = 1,
  viewed = false,
}) => {
  const size = 74;
  const strokeWidth = 3;
  const radius = 34;
  const circumference =
    2 * Math.PI * radius;

  const gap = 4;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
      }}
    >
      <svg
        width={size}
        height={size}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform: "rotate(-90deg)",
        }}
      >
        {Array.from({
          length: storyCount,
        }).map((_, index) => {
          const segmentLength =
            circumference /
              storyCount -
            gap;

          const offset =
            (circumference /
              storyCount) *
            index;

          return (
            <circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={
                viewed
                  ? "#bdbdbd"
                  : "#ff0069"
              }
              strokeWidth={
                strokeWidth
              }
              strokeDasharray={`${segmentLength} ${circumference}`}
              strokeDashoffset={
                -offset
              }
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      <div
        style={{
          position: "absolute",
          inset: 5,
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        <Image
          src={avatar}
          alt=""
          fill
          className="object-fit-cover"
        />
      </div>
    </div>
  );
};

export default StoryRing;