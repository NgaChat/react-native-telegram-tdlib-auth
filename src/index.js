import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-telegram-tdlib-auth' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({
    ios: "• You have run 'pod install'\n",
    default: ''
  }) +
  '• You rebuilt the app after installing the package\n' +
  '• You are not using Expo managed workflow\n';

const TelegramTdlibAuth = NativeModules.TelegramTdlibAuth
  ? NativeModules.TelegramTdlibAuth
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

/**
 * Initialize Telegram TDLib with API credentials
 */
function init(options) {
  return TelegramTdlibAuth.init(options.apiId, options.apiHash);
}

/**
 * Send phone number for login
 */
function sendPhoneNumber(phoneNumber) {
  return TelegramTdlibAuth.sendPhoneNumber(phoneNumber);
}

/**
 * Verify the code received
 */
function verifyCode(code) {
  return TelegramTdlibAuth.verifyCode(code);
}

/**
 * Get current logged-in user
 */
function getUser() {
  return TelegramTdlibAuth.getUser();
}

/**
 * Logout current session
 */
function logout() {
  return TelegramTdlibAuth.logout();
}

export default {
  init,
  sendPhoneNumber,
  verifyCode,
  getUser,
  logout,
};
