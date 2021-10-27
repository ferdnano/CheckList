import {
  createStackNavigator, createAppContainer
}
  from "react-navigation";
import Login from "./src/pages/Login.js";
import Menu  from "./src/pages/Menu";
import Cadastro from "./src/pages/Cadastro.js";
import Sobre from "./src/pages/Sobre.js";

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login
  },
  Menu: {
    screen: Menu
  },
  Cadastro: {
    screen: Cadastro
  },
  Sobre: {
    screen: Sobre
  }
},
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        alignItems: 'center'
      }

    }
  });

export default createAppContainer(AppNavigator);