import { fontFamily, loadFont } from "@remotion/google-fonts/Inter";
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { CompositionProps } from "../../../types/constants";

loadFont("normal", {
  subsets: ["latin"],
  weights: ["400", "700"],
});

const cardStyle: React.CSSProperties = {
  borderRadius: 26,
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  boxShadow: "0 28px 72px rgba(8, 42, 79, 0.18)",
  border: "1px solid rgba(120, 168, 228, 0.25)",
};

const HeroScene: React.FC<{ title: string }> = ({ title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const reveal = spring({
    frame,
    fps,
    durationInFrames: 34,
    config: { damping: 200 },
  });

  const tagline = "AI parses every syllabus and builds your course timeline.";
  const visibleCharacters = Math.floor(
    interpolate(frame, [10, 10 + 2.6 * fps], [0, tagline.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }),
  );

  const glow = interpolate(frame, [0, 3 * fps], [0.3, 0.75], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.sin),
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 15% 20%, #d2efff 0%, #f4fbff 35%, #f7f8fc 100%)",
        padding: 90,
        fontFamily,
      }}
    >
      <div
        style={{
          ...cardStyle,
          flex: 1,
          padding: 72,
          transform: `translateY(${interpolate(reveal, [0, 1], [38, 0])}px)`,
          opacity: reveal,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -140,
            top: -150,
            width: 430,
            height: 430,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(77,175,255,${glow}) 0%, rgba(77,175,255,0) 72%)`,
          }}
        />
        <p style={{ fontSize: 34, color: "#0b4870", margin: 0 }}>
          Built for overwhelmed students
        </p>
        <h1
          style={{
            fontSize: 124,
            lineHeight: 1,
            color: "#0d2137",
            margin: "24px 0 36px",
            letterSpacing: -2,
            maxWidth: 850,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: 44,
            lineHeight: 1.3,
            color: "#22415e",
            margin: 0,
            maxWidth: 840,
          }}
        >
          {tagline.slice(0, visibleCharacters)}
        </p>
      </div>
    </AbsoluteFill>
  );
};

const ParsingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appAppear = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 36,
  });

  const assignmentAppear = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 34,
    delay: 16,
  });

  const examAppear = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 34,
    delay: 28,
  });

  const projectAppear = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 34,
    delay: 40,
  });

  const pulse = interpolate(frame % (fps * 2), [0, fps, fps * 2], [0.25, 1, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(155deg, #0f223a 0%, #123b66 100%)",
        padding: 90,
        fontFamily,
        color: "white",
      }}
    >
      <h2 style={{ margin: 0, fontSize: 82, lineHeight: 1.05, maxWidth: 920 }}>
        Drop in any syllabus PDF. Syllabus Sync does the busywork.
      </h2>
      <div style={{ display: "flex", gap: 30, marginTop: 52, alignItems: "stretch", flex: 1 }}>
        <div
          style={{
            width: 430,
            borderRadius: 34,
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255,255,255,0.22)",
            padding: "36px 30px",
            transform: `translateY(${interpolate(appAppear, [0, 1], [44, 0])}px)`,
            opacity: appAppear,
          }}
        >
          <p style={{ margin: 0, fontSize: 28, color: "#d9ecff" }}>Uploaded</p>
          <p style={{ margin: "14px 0 0", fontSize: 44, fontWeight: 700 }}>
            CHEM-101-Syllabus.pdf
          </p>
          <div
            style={{
              marginTop: 34,
              height: 16,
              borderRadius: 999,
              backgroundColor: "rgba(255,255,255,0.2)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${interpolate(frame, [0, 2.6 * fps], [18, 100], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })}%`,
                height: "100%",
                borderRadius: 999,
                backgroundColor: "#87d4ff",
              }}
            />
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18 }}>
          {[
            { label: "Assignment", value: "Lab Report 1 due Sep 16", progress: assignmentAppear },
            { label: "Exam", value: "Midterm Exam Oct 08", progress: examAppear },
            { label: "Project", value: "Group Project milestone Oct 20", progress: projectAppear },
          ].map((row) => (
            <div
              key={row.value}
              style={{
                borderRadius: 22,
                backgroundColor: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.24)",
                padding: "20px 24px",
                transform: `translateX(${interpolate(row.progress, [0, 1], [45, 0])}px)`,
                opacity: row.progress,
              }}
            >
              <p style={{ margin: 0, fontSize: 22, color: "#9fd7ff" }}>{row.label}</p>
              <p style={{ margin: "7px 0 0", fontSize: 34, fontWeight: 700 }}>{row.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 88,
          top: 86,
          width: 28,
          height: 28,
          borderRadius: "50%",
          backgroundColor: "#97f3ff",
          boxShadow: `0 0 ${30 + pulse * 40}px rgba(151,243,255,0.85)`,
        }}
      />
    </AbsoluteFill>
  );
};

const CalendarScene: React.FC<{ title: string }> = ({ title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const reveal = spring({
    frame,
    fps,
    durationInFrames: 36,
    config: { damping: 200 },
  });

  const columns = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const events = [
    { day: 0, top: 0.2, height: 0.18, color: "#58c6ff", text: "Quiz" },
    { day: 1, top: 0.48, height: 0.2, color: "#5fe1b9", text: "Reading" },
    { day: 2, top: 0.28, height: 0.26, color: "#ffbe57", text: "Lab" },
    { day: 3, top: 0.62, height: 0.2, color: "#ff8f71", text: "Paper" },
    { day: 4, top: 0.36, height: 0.22, color: "#d59dff", text: "Exam" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #f8fbff 0%, #eef5ff 100%)",
        padding: 90,
        fontFamily,
      }}
    >
      <h2 style={{ margin: 0, fontSize: 88, color: "#0e2440", lineHeight: 1.05 }}>
        One calm calendar, across every class.
      </h2>
      <p style={{ margin: "22px 0 0", fontSize: 36, color: "#31506d", maxWidth: 940 }}>
        {title} helps you plan your week before panic mode starts.
      </p>

      <div
        style={{
          ...cardStyle,
          marginTop: 44,
          flex: 1,
          padding: 32,
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 12,
          transform: `translateY(${interpolate(reveal, [0, 1], [30, 0])}px)`,
          opacity: reveal,
        }}
      >
        {columns.map((day, index) => (
          <div
            key={day}
            style={{
              borderRadius: 18,
              backgroundColor: "#f4f8ff",
              border: "1px solid #d7e4ff",
              padding: 14,
              position: "relative",
            }}
          >
            <p style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#274666" }}>{day}</p>
            <div
              style={{
                position: "absolute",
                left: 14,
                right: 14,
                top: 54,
                bottom: 14,
              }}
            >
              {events
                .filter((event) => event.day === index)
                .map((event) => {
                  const itemProgress = spring({
                    frame,
                    fps,
                    durationInFrames: 26,
                    delay: 10 + index * 7,
                    config: { damping: 200 },
                  });

                  return (
                    <div
                      key={`${event.text}-${index}`}
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: `${event.top * 100}%`,
                        height: `${event.height * 100}%`,
                        borderRadius: 14,
                        backgroundColor: event.color,
                        transform: `scale(${interpolate(itemProgress, [0, 1], [0.8, 1])})`,
                        opacity: itemProgress,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#0f1f33",
                        fontWeight: 700,
                        fontSize: 22,
                      }}
                    >
                      {event.text}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 26,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#0e2440",
          color: "white",
          borderRadius: 24,
          padding: "24px 30px",
        }}
      >
        <p style={{ margin: 0, fontSize: 34, fontWeight: 700 }}>
          Syllabus Sync. Stay ahead, not behind.
        </p>
        <p style={{ margin: 0, fontSize: 28, color: "#9ac9ff" }}>Try it this semester</p>
      </div>
    </AbsoluteFill>
  );
};

export const Main = ({ title }: z.infer<typeof CompositionProps>) => {
  const { fps } = useVideoConfig();

  const heroDuration = 4 * fps;
  const parsingDuration = 5 * fps;
  const calendarDuration = 6 * fps;

  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={heroDuration} premountFor={1 * fps}>
        <HeroScene title={title} />
      </Sequence>
      <Sequence
        from={heroDuration}
        durationInFrames={parsingDuration}
        premountFor={1 * fps}
      >
        <ParsingScene />
      </Sequence>
      <Sequence
        from={heroDuration + parsingDuration}
        durationInFrames={calendarDuration}
        premountFor={1 * fps}
      >
        <CalendarScene title={title} />
      </Sequence>
    </AbsoluteFill>
  );
};