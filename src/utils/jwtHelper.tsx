import { JwtPayload } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export function getUserIdFromToken(token: string) {
  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    const userIdIdentifier =
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
    return userIdIdentifier;
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
}

export function getRoleFromToken(token: string) {
  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    const role =
      decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];

    return role;
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
}

export function getAddressFromToken(token: string) {
  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    const userAddress =
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/streetaddress"
      ];

    return userAddress;
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
}
