import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

export default class Sobre extends PureComponent {

  static navigationOptions = {
    title: "Sobre"
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{margin: 20}}>
        
        <Text style={{fontWeight: 'bold', fontSize: 24}}>Dados do Desenvolvedor:</Text>
        <Text style={{marginBottom: 20, fontSize: 20}}>Nome: Fernando Khoury</Text>
        <Text style={{marginBottom: 20, fontSize: 16}}>App de Lista de Tarefas desenvolvido usando a linguagem React Native 
          com a base de dados Backend diretamente conectado com o FireBase.</Text>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Professor:</Text>
        <Text style={{fontSize: 20}}>Marcos</Text>

      </View>
    )
  }
}
