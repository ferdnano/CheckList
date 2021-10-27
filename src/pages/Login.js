import React, { Component } from 'react'
import { Text, View, Button, TextInput, StyleSheet, AsyncStorage, AlertIOS } from 'react-native'
import { CheckBox } from 'react-native-elements'
import firebase from 'firebase'

export default class Login extends Component {

  static navigationOptions = {
    title: "Login"
  }

  async componentDidMount() {
    let email = await AsyncStorage.getItem('email')
    let senha = await AsyncStorage.getItem('senha')
    let checked = await AsyncStorage.getItem('checked')
    let checkedManterme = await AsyncStorage.getItem('checkedManterme')

    if (email != null) {
      this.setState({ email })
    }

    if (senha != null) {
      this.setState({ senha })
    }

    if (checkedManterme === 'true') {
      this.setState({ checkedManterme: true })
      firebase
        .auth()
        .signInWithEmailAndPassword(
          email, senha
        )
        .then(retorno => {
          this.props.navigation.replace("Menu")
        })
    } else {
      this.setState({ checkedManterme: false })
    }

    if (checked === 'true') {
      this.setState({ checked: true })
      this.setState({ email: email, senha: senha })
    } else {
      this.setState({ checked: false })
      this.setState({ email: '', senha: '' })
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      senha: "",
      checked: false,
      checkedManterme: false
    }

    var firebaseConfig = {
      apiKey: "AIzaSyCFFLXUWLdJnzOgaS28bJmz67e5NAuoMvs",
      authDomain: "checklist-c69bd.firebaseapp.com",
      databaseURL: "https://checklist-c69bd.firebaseio.com",
      projectId: "checklist-c69bd",
      storageBucket: "checklist-c69bd.appspot.com",
      messagingSenderId: "10576377477",
      appId: "1:10576377477:web:dc96872942518b50"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }


  render() {

    return (

      <View style={{ margin: 15 }}>

        <Text style={{ fontSize: 20, fontWeight: 'bold' }}> Autentique-se com FireBase: </Text>

        <Text style={styles.texto}> Email: </Text>

        <View style={styles.caixa}>

          <TextInput
            value={this.state.email}
            onChangeText={
              (valor) => {
                this.setState({ email: valor })
              }
            }
            placeholder="fulano@gmail.com"
            placeholderTextColor="grey" />

        </View>

        <Text style={styles.texto}> Senha: </Text>

        <View style={styles.caixa}>

          <TextInput
            value={this.state.senha}
            secureTextEntry={true}

            onChangeText={
              (valor) => {
                this.setState({ senha: valor })
              }
            }
            placeholder="senha"
            placeholderTextColor="grey" />

        </View>

        <CheckBox
          center
          title='Memorizar'
          checked={this.state.checked}
          checkedColor='blue'
          onPress={() =>
            this.setState({ checked: !this.state.checked })
          }
        />

        <CheckBox
          center
          title='Manter-me conectado'
          checked={this.state.checkedManterme}
          checkedColor='blue'
          onPress={() =>
            this.setState({ checkedManterme: !this.state.checkedManterme })
          }
        />

        <Button
          onPress={
            () => {

              firebase
                .auth()
                .signInWithEmailAndPassword(
                  this.state.email, this.state.senha
                )
                .then(retorno => {
                  if (this.state.checked) {
                    AsyncStorage.setItem('email', this.state.email)
                    AsyncStorage.setItem('senha', this.state.senha)
                    AsyncStorage.setItem('checked', 'true')
                  } else {
                    AsyncStorage.setItem('email', '')
                    AsyncStorage.setItem('senha', '')
                    AsyncStorage.setItem('checked', 'false')
                  }

                  if (this.state.checkedManterme) {
                    AsyncStorage.setItem('checkedManterme', 'true')
                  } else {
                    AsyncStorage.setItem('checkedManterme', 'false')
                  }

                  console.log(retorno.user.uid)
                  this.props.navigation.replace("Menu")
                })
                .catch(erro => {
                  console.log("Erro: " + erro)
                  AlertIOS.alert("Erro de autenticação: \n" + erro)
                })

            }}

          title="Login"
        />

        <Button
          onPress={
            () => {
              this.props.navigation.navigate('Cadastro')
            }
          }
          title="Cadastro"
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  caixa: {
    borderWidth: 1,
    width: "90%",
    margin: 15,
    padding: 5
  },
  texto: {
    marginTop: 12
  }
});
