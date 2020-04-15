import log from 'loglevel';
log.setLevel(process.env.DEBUG ? log.levels.DEBUG : log.levels.WARN);
export default log;
