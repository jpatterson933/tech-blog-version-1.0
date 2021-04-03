const logout = require('./logout')
const { IdleSessionTimeout } = require('idle-session-timeout')

require('idle-session-timeout')

const session = new IdleSessionTimeout(5 * 1000);

session.onTimeOut = () => {
    logout();
    console.log('timeOut')
}