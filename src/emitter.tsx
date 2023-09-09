import EventEmitter from 'eventemitter3';

export enum EMITTER_EVENTS {
  'NOTIFICATION' = 'NOTIFICATION',
}
const eventEmitter = new EventEmitter<string, () => void>();
const NotificationEmitter = {
  on: (event: string, fn: (name: string) => void) => eventEmitter.on(event, fn),
  once: (event: string, fn: (name: string) => void) =>
    eventEmitter.once(event, fn),
  off: (event: string, fn: (name: string) => void) =>
    eventEmitter.off(event, fn),
  emit: (event: string, payload: string) => eventEmitter.emit(event, payload),
};
Object.freeze(NotificationEmitter);
export default NotificationEmitter;
