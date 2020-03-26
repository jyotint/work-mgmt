import { matchPath } from "react-router-dom";

export function GetMatchforPath(history: any, ...path: string[]): any {
  const url = history.location.pathname;

  const matchedPath = path.find((item) => {
    return null !== matchPath(url, { path: item, exact: true, strict: false });
  });

  return matchedPath ? matchPath(url, { path: matchedPath, exact: true, strict: false }) : undefined;
}
