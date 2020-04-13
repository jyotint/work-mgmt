import { matchPath } from "react-router-dom";
import { KeyValueModelList } from "../models/keyValueModel";

export function GetMatchforPath(history: any, ...path: string[]): any {
  const url = history.location.pathname;

  const matchedPath = path.find((item) => {
    return null !== matchPath(url, { path: item, exact: true, strict: false });
  });

  return matchedPath ? matchPath(url, { path: matchedPath, exact: true, strict: false }) : undefined;
}


export function getValue(list: KeyValueModelList, key: string | undefined): string | undefined {
  if(list === undefined || key === undefined)
    return undefined;

  const selectedItem = list.find(item => item.key === key);
  return selectedItem?.value;
}

export function getKey(list: KeyValueModelList, value: string | undefined): string | undefined {
  if(list === undefined || value === undefined)
    return undefined;

  const selectedItem = list.find(item => item.value === value);
  return selectedItem?.key;
}
