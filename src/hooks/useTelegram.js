const tg = window.Telegram.WebApp;

export function useTelegram() {
  const onClose = () => {
    tg.close();
  };

  const sendData = (data) => {
    tg.MainButton.setParams({
      text: "Send data",
    });

    tg.sendData(JSON.stringify(data));
  };

  const mClick = (data) => {
    tg.MainButton.onClick(() => {
      sendData(data);
    });

    return () => {
      tg.MainButton.offClick();
    };
  };

  return {
    onClose,
    tg,
    sendData,
    backB: tg.BackButton,
    mainBt: tg.MainButton,
    mClick,
    user: tg.initDataUnsafe?.user,
  };
}
