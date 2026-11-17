// no-op when !Notification.isSupported() or settings.notifications is off
export function notify(_o: { title: string; body: string; onClick?: () => void }): void { throw new Error("todo"); }
