import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTelegram } from "./useTelegram";

export const useBackButton = (backPath) => {
  const { tg } = useTelegram();
  const navigate = useNavigate();

  useEffect(() => {
    const onClickBackButton = () => {
      if (backPath === "close") {
        tg.close();
      } else {
        navigate(backPath);
      }
    };

    tg.BackButton.show();
    tg.BackButton.onClick(onClickBackButton);

    return () => {
      tg.BackButton.offClick(onClickBackButton);
    };
  }, [backPath, navigate, tg]);
};
