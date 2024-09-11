const tg = window.Telegram.WebApp;

export function useTelegram() {
  const onClose = () => {
    tg.close();
  };

  const sendData = (data) => {
    tg.sendData(JSON.stringify(data));
  };

  const main = {
    hide: (shouldHide) => {
      if (shouldHide) {
        tg.MainButton.hide();
      } else {
        tg.MainButton.show();
      }
    },
    click: (callback) => {
      tg.MainButton.setParams({
        text: "Send data",
      });

      tg.MainButton.onClick(callback);

      return () => {
        tg.MainButton.offClick(callback);
      };
    },
  };

  return {
    onClose,
    tg,
    sendData,
    backB: tg.BackButton,
    main,
    user: tg.initDataUnsafe?.user,
  };
}
