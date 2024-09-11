const tg = window.Telegram.WebApp;

export function useTelegram() {
  const onClose = () => {
    tg.close();
  };

  return {
    onClose,
    tg,
    backB: tg.BackButton,
    mainB: tg.MainButton,
    user: tg.initDataUnsafe?.user,
  };
}
