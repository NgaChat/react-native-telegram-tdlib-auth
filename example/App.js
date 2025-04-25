import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import TelegramTdlibAuth from 'react-native-telegram-tdlib-auth';

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    TelegramTdlibAuth.init({
      apiId: 123456,
      apiHash: 'your-api-hash',
    });
    TelegramTdlibAuth.sendPhoneNumber(phoneNumber);
  };

  const handleVerifyCode = () => {
    TelegramTdlibAuth.verifyCode(verificationCode);
  };

  const fetchUser = () => {
    TelegramTdlibAuth.getUser().then(setUser);
  };

  return (
    <View>
      <TextInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter phone number"
      />
      <Button title="Login with Telegram" onPress={handleLogin} />

      <TextInput
        value={verificationCode}
        onChangeText={setVerificationCode}
        placeholder="Enter verification code"
      />
      <Button title="Verify Code" onPress={handleVerifyCode} />

      <Button title="Fetch User" onPress={fetchUser} />
      {user && <Text>{JSON.stringify(user)}</Text>}
    </View>
  );
}
