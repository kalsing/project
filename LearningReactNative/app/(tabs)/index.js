import {useState} from 'react';
import {View, TextInput, Button} from 'react-native';

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  function criarUser() {
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName
      })
    });
    setFirstName('');
    setLastName('');
  }




  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <TextInput
        placeholder="nome"
        value={firstName}
        onChangeText={setFirstName}
        style={{ borderWidth: 1, padding: 10 }}
      />

      <TextInput
        placeholder="sobrenome"
        value={lastName}
        onChangeText={setLastName}
        style={{ borderWidth: 1, padding: 10, marginTop: 10 }}
      />

      <Button title="Criar usuario" onPress={criarUser} />
    </View>
  );
}
