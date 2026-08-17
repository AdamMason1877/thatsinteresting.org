import { publishingConfig } from './publishingConfig.js'

export const requiredArticleFields = [
  'slug',
  'title',
  'category',
  'hook',
  'year_or_era',
  'summary',
  'body',
  'sources',
  'cinematic_concept',
  'cinematic_assets',
  'poster_frame',
  'mobile_video',
  'desktop_frame_sequence',
  'frame_count',
  'visual_alt_text',
  'published_at',
]

function isPresent(value) {
  if (Array.isArray(value)) return true
  return value !== undefined && value !== null && value !== ''
}

export function defineArticle(article) {
  const missing = requiredArticleFields.filter((field) => !Object.hasOwn(article, field))

  if (missing.length > 0) {
    throw new Error(`Article "${article.slug ?? 'unknown'}" is missing: ${missing.join(', ')}`)
  }

  const emptyEditorialFields = ['slug', 'title', 'category', 'hook', 'summary', 'visual_alt_text', 'published_at']
    .filter((field) => !isPresent(article[field]))

  if (emptyEditorialFields.length > 0) {
    throw new Error(
      `Article "${article.slug ?? 'unknown'}" has empty editorial fields: ${emptyEditorialFields.join(', ')}`,
    )
  }

  const questions = ['assumption', 'violation', 'transformation', 'final_image']
  const missingQuestions = questions.filter((field) => !isPresent(article.cinematic_concept[field]))

  if (missingQuestions.length > 0) {
    throw new Error(
      `Article "${article.slug}" has an incomplete cinematic concept: ${missingQuestions.join(', ')}`,
    )
  }

  if (article.frame_count !== article.desktop_frame_sequence.length) {
    throw new Error(
      `Article "${article.slug}" frame_count must match desktop_frame_sequence.length`,
    )
  }

  if (article.cinematic_assets.video_model !== publishingConfig.cinematic_video_model) {
    throw new Error(
      `Article "${article.slug}" must use cinematic video model "${publishingConfig.cinematic_video_model}"`,
    )
  }

  return Object.freeze(article)
}
