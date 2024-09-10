/**
 *Routes these do not require authentication
 *@type{string[]}
 */
export const publicRoutes = ["/"];

/**
 *Routes that require authentication
 *@type{string[]}
 */
export const authRoutes = ["/auth/register", "auth/login"];

/**
 *Routes that used for API authentication process
 *@type{string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 *Default route after login
 *@type{string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
