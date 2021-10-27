import React, { Component } from 'react'
import { Text, View, Button, AsyncStorage, TextInput, StyleSheet, FlatList, AlertIOS } from 'react-native'
import firebase from 'firebase'
import _ from 'lodash';
import { ListItem } from 'react-native-elements';

export default class Menu extends Component {

  static navigationOptions = {
    title: "Tarefas",
  }

  constructor(props) {
    super(props)

    this.state = {
      descricao: "",
      tasks: {}
    }
  }

  async componentDidMount() {
    this.buscarTasks()
  }

  buscarTasks() {
    console.log("Buscando tasks...")

    let { currentUser } = firebase.auth()

    firebase
      .database()
      .ref(`/users/${currentUser.uid}/tasks/`)
      .on('value', snapchot => {
        let snapchotVal = snapchot.val()

        let saida = _.map(snapchotVal, (tasks) => {
          return { tasks }
        });
        console.log("################## saida #######################")
        console.log(saida)

        this.setState({ tasks: saida })
      })
  }

  deletarTarefa(index) {
    console.log("INDEX: " + index)
    console.log("this.state.tasks.descricao: " + this.state.tasks.descricao)
  }

  render() {
    return (
      <View>

        <View style={styles.caixa}>
          <TextInput
            value={this.state.descricao}
            onChangeText={
              (valor) => {
                this.setState({ descricao: valor })
              }
            }
            placeholder="Descrição"
            placeholderTextColor="grey" />
        </View>

        <Button
          title="Salvar Task"
          onPress={async () => {
            let descricao = this.state.descricao

            let { currentUser } = firebase.auth()

            console.log("CurrentUser = " + currentUser)

            let teste = (descricao === "")

            if (!teste) {
              await firebase
                .database()
                .ref(`/users/${currentUser.uid}/tasks`)
                .push({ descricao: descricao, checked: false })

              console.log("Dados Salvos!")
              this.buscarTasks()
            } else {
              AlertIOS.alert("Precisa de uma descrição")
            }
          }}
        />

        <View style={{ margin: 10, alignItems: 'center' }}>
          <Text style={styles.titulo}>TAREFAS:</Text>
        </View>

        <FlatList
          data={this.state.tasks}
          renderItem={({ item }) =>
            <View style={styles.caixa}>
              <Text style={styles.texto}>
                {`Descrição: ${item.tasks.descricao}`}
              </Text>
              <Text style={styles.texto}>
                {`Feita: ${(item.tasks.checked).toString()}`}
              </Text>
            </View>}
        />

        <Button
          title="Voltar/Logoff"
          onPress={() => {
            firebase.auth().signOut()
            AsyncStorage.setItem('checkedManterme', 'false')
            this.props.navigation.replace("Login")
          }}
        />

        <View style={styles.cantoDireito}>
          <Button
            title="Sobre"
            onPress={
              () => {
                this.props.navigation.navigate("Sobre")
              }
            }
          />
        </View>
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
    padding: 5,
    alignItems: 'center'
  },
  texto: {
    marginTop: 12,
    fontSize: 15
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  cantoDireito: {
    backgroundColor: 'powderblue',
    justifyContent: 'flex-end',
    margin: 15
  }
});
