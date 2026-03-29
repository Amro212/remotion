import { z } from "zod";
export const COMP_NAME = "SyllabusSyncPromo";

export const CompositionProps = z.object({
  title: z.string(),
});

export const defaultMyCompProps: z.infer<typeof CompositionProps> = {
  title: "Syllabus Sync",
};

export const DURATION_IN_FRAMES = 450;
export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
export const VIDEO_FPS = 30;
