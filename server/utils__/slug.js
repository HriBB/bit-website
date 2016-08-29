
/**
 * Increment slug helper
 *
 * Simply takes a slug and increments it
 *
 * Examples:
 * test-slug   => test-slug-2
 * test-slug-2 => test-slug-3
 * test-slug-3 => test-slug-4
 * ...
 *
 * @param  {String} s
 * @return {String}
 */
export function incrementSlug(s) {
  const i = s.lastIndexOf('-')
  const n = parseInt(s.slice(i + 1))
  const nn = n > 0 ? (n + 1) : 2
  const bare = n > 0 ? s.slice(0, i) : s
  const slug = bare + '-' + nn
  return slug
}
