// Whole app should use ISO date format, use this module to enforce that

export const today = () => new Date().toISOString().split('T')[0];
