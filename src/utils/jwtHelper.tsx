import { JwtPayload } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export function getUserIdFromToken(token: string) {
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const userIdIdentifier =
        decodedToken[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ];
      return userIdIdentifier;
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }