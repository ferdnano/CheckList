import React, { PureComponent } from 'react'
import { View, Text, TextInput, Button, StyleSheet, AlertIOS } from 'react-native'
import firebase from 'firebase'

export default class Cadastro extends PureComponent {

  static navigationOptions = {
    title: "Cadastro"
  }

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      senha: "",
      senha2: ""
    }
  }

  render() {
    return (
      <View style={{ margin: 15 }}>
        <Text style={styles.titulo}>Formulario de Cadastro: </Text>

        <Text style={styles.texto}>Email:</Text>

        <View style={styles.caixa}>
          <TextInput
            value={this.state.email}
            onChangeText={
              (valor) => {
                this.setState({ email: valor })
              }
            }
            placeholder="Email"
            placeholderTextColor="grey" />
        </View>

        <Text style={styles.texto}>Senha: </Text>

        <View style={styles.caixa}>
          <TextInput
            value={this.state.senha}
            secureTextEntry={true}
            onChangeText={
              (valor) => {
                this.setState({ senha: valor })
              }
            }
            placeholder="Senha"
            placeholderTextColor="grey" />
        </View>

        <Text style={styles.texto}>Confirme a senha: </Text>

        <View style={styles.caixa}>
          <TextInput
            value={this.state.senha2}
            secureTextEntry={true}
            onChangeText={
              (valor) => {
                this.setState({ senha2: valor })
              }
            }
            placeholder="Repetir Senha"
            placeholderTextColor="grey" />
        </View>

        <Button
          title="Cadastrar"
          style={{ marginTop: 15 }}
          onPress={() => {

            if (this.state.senha === this.state.senha2) {
              firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.senha)
                .then(() => this.props.navigation.replace("Menu"))
                .catch(erro => {
                  console.log("Erro no cadastro: " + erro)
                  AlertIOS.alert("Erro no cadastro: \n" + erro)
                })
            } else {
              AlertIOS.alert("As senhas não são iguais")
            }
          }
          }
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
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
    padding: 5
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 24
  },
  texto: {
    marginTop: 20,
    fontSize: 20
  }
});
