import { useLocation } from "react-router-dom";

export function useUrlParams() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const getMenu = (paramName) => {
    if (!paramName) {
      return [];
    }

    const param = params.get(paramName);

    if (param) {
      return param.split(",").map((item) => {
        const [key, value] = item.split("=");
        return { key, value };
      });
    }
    
    return [];
  };

  return { getMenu };
}