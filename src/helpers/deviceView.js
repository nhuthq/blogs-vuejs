export function getDeviceViewSmart(screenWidth) {
  const isTouchDevice =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const userAgent =
    typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : '';

  const isIPad =
    /ipad/.test(userAgent) ||
    (userAgent.includes('macintosh') && isTouchDevice);

  // PC Screen (Desktop monitors)
  if (screenWidth >= 1920) return 'PCView';

  // Laptop screens (MacBook/Windows laptops)
  if (screenWidth >= 1366) return 'PCView';

  // Tablets and iPads
  if (screenWidth >= 768 || isIPad) return 'TabletView';

  // Mobile phones (iPhone/Android)
  if (screenWidth >= 320) return 'SPView';

  // Fallback for very small screens
  return 'SPView';
}
