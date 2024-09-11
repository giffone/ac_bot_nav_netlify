import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useUrlParams() {
  const location = useLocation();
  const [params, setParams] = useState(new URLSearchParams(location.search));

  useEffect(() => {
    setParams(new URLSearchParams(location.search));
  }, [location.search]);

  const getMenu = (paramName) => {
    const param = params.get(paramName);
    if (param) {
      return param.split(",").map((item) => {
        const [key, value] = item.split("=");
        return { key, value };
      });
    }
    return null;
  };

  return { getMenu };
}
