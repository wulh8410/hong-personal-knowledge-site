export const COURSE_PROGRESS_KEY = "hong-course-progress-v1"
export const COURSE_PROGRESS_EVENT = "hong-course-progress-change"

export function readCourseProgress() {
  if (typeof window === "undefined") return new Set<string>()
  try {
    const stored = JSON.parse(window.localStorage.getItem(COURSE_PROGRESS_KEY) || "[]")
    return new Set(Array.isArray(stored) ? stored.map(String) : [])
  } catch {
    return new Set<string>()
  }
}

export function writeCourseProgress(progress: Set<string>) {
  window.localStorage.setItem(COURSE_PROGRESS_KEY, JSON.stringify(Array.from(progress)))
  window.dispatchEvent(new CustomEvent(COURSE_PROGRESS_EVENT))
}
