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

  return {
    onClose,
    tg,
    sendData,
    backB: tg.BackButton,
    mainBt: tg.MainButton,
    user: tg.initDataUnsafe?.user,
  };
}
