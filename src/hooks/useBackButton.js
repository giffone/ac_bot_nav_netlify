import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTelegram } from "./useTelegram";

export function useBackButton(backPath) {
  const { backB } = useTelegram();
  const navigate = useNavigate();

  useEffect(() => {
    const onClickBackButton = () => {
      navigate(backPath);
    };

    backB.show();
    backB.onClick(onClickBackButton);

    return () => {
      backB.offClick(onClickBackButton);
    };
  }, [backPath, navigate, backB]);
};
