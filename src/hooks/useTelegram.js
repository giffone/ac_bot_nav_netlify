const tg = window.Telegram.WebApp;

function useTelegram() {
  const onClose = () => {
    tg.close();
  };

  return {
    onClose,
    tg,
    user: tg.initDataUnsafe?.user,
  };
}

export default useTelegram;
