import React from 'react';
import { Text, View } from 'react-native';

const Header1 = () => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text style={{ color: '#E17055', fontFamily: 'Racing', fontSize: 30}}>G</Text>
      <Text style={{ color: '#D8D8D8', fontFamily: 'Racing', fontSize: 30}}>ISTOCKE</Text>
      <Text style={{ color: '#00B894', fontFamily: 'Racing', fontSize: 30}}>D</Text>
    </View>
  );
};

export default Header1;